import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import App from './App.vue';
import Routers from './router';
// import store from './store';

let app = null; // eslint-disable-line

export function initApp (shell) {
  Vue.use(ElementUI);
  Vue.use(VueRouter);

  const RouterConfig = {
    routes: Routers,
  };
  const router = new VueRouter(RouterConfig);

  Vue.mixin(shell.mixin);
  app = new Vue({
    router: router,
    extends: App,
    // store,
  }).$mount('#dyasst-capture');
}
