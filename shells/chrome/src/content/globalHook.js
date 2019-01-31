const ReactAgent = require('./libs/reactAgent');

(() => {
  const agent = new ReactAgent();
  agent.inject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);
  window.dyasstReactAgent = agent;
})();
