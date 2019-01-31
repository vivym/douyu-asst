const { EventEmitter } = require('events');
const attachRenderer = require('./attachRenderer');

class ReactAgent extends EventEmitter {
  constructor () {
    super();
    this.subscriber = {};
  }

  subscribe (name, fn) {
    if (!this.subscriber[name]) {
      this.subscriber[name] = [];
    }
    this.subscriber[name].push(fn);
  }

  onMounted (renderer, component, data) {
    const { name } = data;
    if (this.subscriber[name] instanceof Array) {
      this.subscriber[name].forEach(fn => fn('mounted', component, data, renderer));
    }
    if (data.name === 'NormalCard' || data.name === 'NobleCard' || data.name === 'UserCardLitterSister') {
      const { stateNode } = component;
      const { btnArr, chatUserCardData } = stateNode.props;
      if (!btnArr.some(btn => btn.text === '查弹幕')) {
        btnArr.push({
          text: '查弹幕',
          type: 'button',
          userId: chatUserCardData.rel,
          onClick: () => {
            window.dyasstShowBarragePanel && window.dyasstShowBarragePanel(chatUserCardData);
          },
        });
        stateNode.forceUpdate();
      }
    }
  }

  onUnmounted (component) {
    // console.log('onUnmounted', component);
  }

  onUpdated (component, data) {
    const { name } = data;
    if (this.subscriber[name] instanceof Array) {
      this.subscriber[name].forEach(fn => fn('updated', component, data));
    }
    if (data.name === 'NormalCard' || data.name === 'NobleCard' || data.name === 'UserCardLitterSister') {
      const { stateNode } = component;
      const { btnArr, chatUserCardData } = stateNode.props;
      if (!btnArr.some(btn => btn.text === '查弹幕')) {
        btnArr.push({
          text: '查弹幕',
          type: 'button',
          userId: chatUserCardData.rel,
          onClick: () => {
            window.dyasstShowBarragePanel && window.dyasstShowBarragePanel(chatUserCardData);
          },
        });
        stateNode.forceUpdate();
      }
    }
  }

  addRoot (renderer, internalInstance) {
  }

  rootCommitted (renderer, internalInstance, data) {
  }

  onUpdatedProfileTimes (component, data) {
  }

  inject (hook) {
    hook.sub('renderer-attached', ({ id, renderer, helpers }) => {
      helpers.walkTree(this.onMounted.bind(this, id), this.addRoot.bind(this, id));
    });
    hook.sub('mount', ({ renderer, internalInstance, data }) => this.onMounted(renderer, internalInstance, data));
    hook.sub('unmount', ({ renderer, internalInstance }) => this.onUnmounted(internalInstance));
    hook.sub('update', ({ renderer, internalInstance, data }) => this.onUpdated(internalInstance, data));

    hook.sub('root', ({ renderer, internalInstance }) => this.addRoot(renderer, internalInstance));
    hook.sub('rootCommitted', ({ renderer, internalInstance, data }) => this.rootCommitted(renderer, internalInstance, data));
    hook.sub('updateProfileTimes', ({ renderer, internalInstance, data }) => this.onUpdatedProfileTimes(internalInstance, data));

    this.setupBackend(hook);
  }

  setupBackend (hook) {
    const oldReact = window.React && window.React.__internals;
    if (oldReact && Object.keys(hook._renderers).length === 0) {
      hook.inject(oldReact);
    }

    for (var rid in hook._renderers) {
      hook.helpers[rid] = attachRenderer(hook, rid, hook._renderers[rid]);
      hook.emit('renderer-attached', { id: rid, renderer: hook._renderers[rid], helpers: hook.helpers[rid] });
    }

    hook.on('renderer', ({ id, renderer }) => {
      hook.helpers[id] = attachRenderer(hook, id, renderer);
      hook.emit('renderer-attached', { id, renderer, helpers: hook.helpers[id] });
    });

    const shutdown = () => {
      for (let id in hook.helpers) {
        hook.helpers[id].cleanup();
      }
      hook.off('shutdown', shutdown);
    };
    hook.on('shutdown', shutdown);
  }
};

module.exports = ReactAgent;
