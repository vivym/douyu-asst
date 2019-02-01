function installReactGlobalHook () {
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    return;
  }

  function detectReactBuildType (renderer) {
    try {
      if (typeof renderer.version === 'string') {
        // React DOM Fiber (16+)
        if (renderer.bundleType > 0) {
          // This is not a production build.
          // We are currently only using 0 (PROD) and 1 (DEV)
          // but might add 2 (PROFILE) in the future.
          return 'development';
        }
        // React 16 uses flat bundles. If we report the bundle as production
        // version, it means we also minified and envified it ourselves.
        return 'production';
      }
      const toString = Function.prototype.toString;
      if (renderer.Mount && renderer.Mount._renderNewRootComponent) {
        // React DOM Stack
        const renderRootCode = toString.call(renderer.Mount._renderNewRootComponent);
        // Filter out bad results (if that is even possible):
        if (renderRootCode.indexOf('function') !== 0) {
          // Hope for the best if we're not sure.
          return 'production';
        }
        if (renderRootCode.indexOf('function') !== 0) {
          // Hope for the best if we're not sure.
          return 'production';
        }
        // For other versions (and configurations) it's not so easy.
        // Let's quickly exclude proper production builds.
        // If it contains a warning message, it's either a DEV build,
        // or an PROD build without proper dead code elimination.
        if (renderRootCode.indexOf('should be a pure function') !== -1) {
          // Now how do we tell a DEV build from a bad PROD build?
          // If we see NODE_ENV, we're going to assume this is a dev build
          // because most likely it is referring to an empty shim.
          if (renderRootCode.indexOf('NODE_ENV') !== -1) {
            return 'development';
          }
          // If we see "development", we're dealing with an envified DEV build
          // (such as the official React DEV UMD).
          if (renderRootCode.indexOf('development') !== -1) {
            return 'development';
          }
          // I've seen process.env.NODE_ENV !== 'production' being smartly
          // replaced by `true` in DEV by Webpack. I don't know how that
          // works but we can safely guard against it because `true` was
          // never used in the function source since it was written.
          if (renderRootCode.indexOf('true') !== -1) {
            return 'development';
          }
          // By now either it is a production build that has not been minified,
          // or (worse) this is a minified development build using non-standard
          // environment (e.g. "staging"). We're going to look at whether
          // the function argument name is mangled:
          if (
            // 0.13 to 15
            renderRootCode.indexOf('nextElement') !== -1 ||
            // 0.12
            renderRootCode.indexOf('nextComponent') !== -1
          ) {
            // We can't be certain whether this is a development build or not,
            // but it is definitely unminified.
            return 'unminified';
          } else {
            // This is likely a minified development build.
            return 'development';
          }
        }
        // By now we know that it's envified and dead code elimination worked,
        // but what if it's still not minified? (Is this even possible?)
        // Let's check matches for the first argument name.
        if (
          // 0.13 to 15
          renderRootCode.indexOf('nextElement') !== -1 ||
          // 0.12
          renderRootCode.indexOf('nextComponent') !== -1
        ) {
          return 'unminified';
        }
        // Seems like we're using the production version.
        // However, the branch above is Stack-only so this is 15 or earlier.
        return 'outdated';
      }
    } catch (err) {
      // TODO:
    }
    return 'production';
  }

  let hasDetectedBadDCE = false;

  const hook = {
    // Shared between Stack and Fiber:
    _dyasst: true, // flag
    _renderers: {},
    helpers: {},
    _listeners: {},
    supportsFiber: true,
    _fiberRoots: {},

    checkDCE (fn) {
      // This runs for production versions of React.
      // Needs to be super safe.
      try {
        const toString = Function.prototype.toString;
        const code = toString.call(fn);
        // This is a string embedded in the passed function under DEV-only
        // condition. However the function executes only in PROD. Therefore,
        // if we see it, dead code elimination did not work.
        if (code.indexOf('^_^') > -1) {
          // Remember to report during next injection.
          hasDetectedBadDCE = true;
          // Bonus: throw an exception hoping that it gets picked up by
          // a reporting system. Not synchronously so that it doesn't break the
          // calling code.
          setTimeout(() => {
            throw new Error(
              'React is running in production mode, but dead code ' +
                'elimination has not been applied. Read how to correctly ' +
                'configure React for production: ' +
                'https://fb.me/react-perf-use-the-production-build'
            );
          });
        }
      } catch (err) {}
    },
    inject (renderer) {
      const id = Math.random().toString(16).slice(2);
      hook._renderers[id] = renderer;
      const reactBuildType = hasDetectedBadDCE ? 'deadcode' : detectReactBuildType(renderer);
      hook.emit('renderer', { id, renderer, reactBuildType });
      return id;
    },
    sub (evt, fn) {
      hook.on(evt, fn);
      return () => hook.off(evt, fn);
    },
    on (evt, fn) {
      if (!hook._listeners[evt]) {
        hook._listeners[evt] = [];
      }
      hook._listeners[evt].push(fn);
    },
    off (evt, fn) {
      if (!hook._listeners[evt]) {
        return;
      }
      const ix = hook._listeners[evt].indexOf(fn);
      if (ix !== -1) {
        hook._listeners[evt].splice(ix, 1);
      }
      if (!hook._listeners[evt].length) {
        hook._listeners[evt] = null;
      }
    },
    emit (evt, data) {
      if (hook._listeners[evt]) {
        hook._listeners[evt].map(fn => fn(data));
      }
    },
    getFiberRoots (rendererID) {
      const roots = hook._fiberRoots;
      if (!roots[rendererID]) {
        roots[rendererID] = new Set();
      }
      return roots[rendererID];
    },
    onCommitFiberUnmount (rendererID, fiber) {
      // TODO: can we use hook for roots too?
      if (hook.helpers[rendererID]) {
        hook.helpers[rendererID].handleCommitFiberUnmount(fiber);
      }
    },
    onCommitFiberRoot (rendererID, root) {
      const mountedRoots = hook.getFiberRoots(rendererID);
      const current = root.current;
      const isKnownRoot = mountedRoots.has(root);
      const isUnmounting = current.memoizedState == null || current.memoizedState.element == null;
      // Keep track of mounted roots so we can hydrate when DevTools connect.
      if (!isKnownRoot && !isUnmounting) {
        mountedRoots.add(root);
      } else if (isKnownRoot && isUnmounting) {
        mountedRoots.delete(root);
      }
      if (hook.helpers[rendererID]) {
        hook.helpers[rendererID].handleCommitFiberRoot(root);
      }
    },
  };
  Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    value: hook,
  });
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeObjectCreate = Object.create;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeMap = Map;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeWeakMap = WeakMap;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.nativeSet = Set;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('renderer', evt => {
    window.postMessage({ source: 'react-detected' }, '*');
  });
}

module.exports = installReactGlobalHook;
