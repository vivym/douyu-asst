<template>
  <div class="home-wrapper">
    <transition name="el-fade-in">
      <controls ref="controls" v-if="show" @close="close" />
    </transition>
    <transition name="el-fade-in">
      <preview
        v-if="show"
        :finderPos="finderPos"
        :playerSize="playerSize"
        @close="close"
        @genStart="onGenStart"
        @genEnd="onGenEnd">
      </preview>
    </transition>
    <transition name="el-fade-in">
      <finder v-if="show" @change="onFinderChanged" :playerSize="playerSize" />
    </transition>
    <transition name="el-fade-in">
      <result v-if="resultShow" :gif="gif" @close="closeResult" />
    </transition>
  </div>
</template>

<script>
import Controls from './Controls.vue';
import Preview from './Preview.vue';
import Finder from './Finder.vue';
import Result from './Result.vue';

export default {
  components: { Controls, Preview, Finder, Result },

  data: () => ({
    show: false,
    resultShow: false,
    finderPos: {
      left: 100,
      top: 100,
      width: 260,
      height: 260,
    },
    playerSize: null,
    gif: '',
  }),

  created () {
    window.dyasstShowCapture = () => {
      this.show = !this.show;
      window.dyasstCaptureMode = this.show;
    };
    const player = document.querySelector('.layout-Player-video');
    const { width, height } = player.getBoundingClientRect();
    this.playerSize = { width, height };
    this.insertResizeListener(player, (e) => {
      const { width, height } = player.getBoundingClientRect();
      this.playerSize = { width, height };
    });
  },

  beforeDestroy () {
    this.removeResizeListener();
    window.dyasstCaptureMode = false;
  },

  methods: {
    onGenStart (crop) {
      const promise = this.$refs.controls.startGenGIF(crop);
      if (promise) {
        promise.then(gif => {
          this.gif = gif;
          this.close();
          this.resultShow = true;
        });
      }
    },
    onGenEnd () {

    },
    closeResult () {
      this.gif = '';
      this.resultShow = false;
    },
    close () {
      this.show = false;
      window.dyasstCaptureMode = this.show;
    },
    onFinderChanged (pos) {
      this.finderPos = pos;
    },
    insertResizeListener (el, listener, context) {
      let listeners = el.__z_resizeListeners;
      if (!listeners) {
        listeners = [];
        el.__z_resizeListeners = listeners;
        if (window.getComputedStyle(el, null).position === 'static') {
          el.style.position = 'relative';
        }
        const obj = this._createResizeTrigger(el);
        el.__resizeTrigger__ = obj;
        obj.__resizeElement__ = el;
      }
      listeners.push({ handler: listener, context });
    },
    removeResizeListener (el, listener, context) {
      const listeners = el.__z_resizeListeners;
      if (listeners) {
        this._removeHandler(el, listener, context);
        if (listeners.length === 0) {
          const trigger = el.__resizeTrigger__;
          if (trigger) {
            trigger.contentDocument.defaultView.removeEventListener('resize', this._handleResize);
            el.removeChild(trigger);
            delete el.__resizeTrigger__;
          }
          delete el.__z_resizeListeners;
        }
      }
    },
    _createResizeTrigger (el) {
      const obj = document.createElement('object');
      obj.setAttribute('style',
            'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;');
      const self = this;
      obj.onload = function (evt) {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
        this.contentDocument.defaultView.addEventListener('resize', self._handleResize);
      };
      obj.type = 'text/html';
      el.appendChild(obj);
      obj.data = 'about:blank';
      return obj;
    },
    _handleResize (e) {
      const ele = e.target || e.srcElement;
      const trigger = ele.__resizeTrigger__;
      if (trigger) {
        const handlers = trigger.__z_resizeListeners;
        if (handlers) {
          for (const h of handlers) {
            const handler = h.handler;
            const context = h.context;
            handler.apply(context, [e]);
          }
        }
      }
    },
    _removeHandler (ele, handler, context) {
      const handlers = ele.__z_resizeListeners;
      if (handlers) {
        for (let i = 0; i < handlers.length; ++i) {
          const h = handlers[i];
          if (h.handler === handler && h.context === context) {
            handlers.splice(i, 1);
            return;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
