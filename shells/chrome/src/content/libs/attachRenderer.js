const attachRendererFiber = require('./attachRendererFiber');

function attachRenderer (hook, rid, renderer) {
  // React Fiber
  if (typeof renderer.findFiberByHostInstance === 'function') {
    return attachRendererFiber(hook, rid, renderer);
  }
  throw new Error('not implemented');
}

module.exports = attachRenderer;
