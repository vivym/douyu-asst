class Loader {
  constructor (config = {}) {
    this.config = config;
    this.body = document.getElementsByTagName('body')[0];
    this.loader = document.createElement('div');
    this.cacheVersions = 'v0.0.1';
    this.loadHistory = {};
    this.loader.setAttribute('data-module', 'loader');
    this.loader.style.display = 'none';
    this.body.appendChild(this.loader);
  }

  filterUrl (t, e) {
    t = t ? t.split(/\?/)[0] : '';
    if (t.match(/\..+$/)) {
      e && e(null, t);
    } else {
      var n = t;
      t = this.config[n] || '';
      t ? e && e(null, t) : e && e('找不到模块');
    }
  }

  loadStart (t, e) {
    if (t.indexOf('.css') >= 0) {
      this.loadCSS(t, () => e && e(null));
    } else {
      if (!(t.indexOf('.js') >= 0)) {
        throw new Error('无法识别的格式');
      } else {
        this.loadJS(t, () => e && e(null));
      }
    }
  }

  loadJS (t, e) {
    const n = document.createElement('script');
    n.type = 'text/javascript';
    n.charset = 'UTF-8';
    if (t.toLowerCase().indexOf('sta-op.douyucdn') !== -1 ||
      t.toLowerCase().indexOf('sta-op-test.douyucdn') !== -1) {
      n.crossOrigin = 'anonymous';
    }
    n.defer = true;
    n.async = false;
    n.src = t;
    if (/MSIE ([6789]\.\d+;)/.exec(navigator.userAgent) || t.indexOf('room/page') !== -1) {
      n.onload = () => e && e();
      n.onerror = () => e && e();
      this.loader.appendChild(n);
    } else {
      this.loader.appendChild(n);
      e && e();
    }
  }

  loadDynamicJs (t, e) {

  }

  loadCSS (t, e) {

  }

  loading (t, e) {

  }

  loadByArray (t, e) {

  }

  load (t, e, n) {

  }

  nextCallback (t, e) {

  }
};

module.exports = Loader;
