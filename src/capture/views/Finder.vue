<template>
  <div
    ref="finderWrapper"
    class="finder-wrapper"
    :style="{ top: `-${playerSize.height}px`, width: `${playerSize.width}px`, height: `${playerSize.height}px` }">
    <draggable
      ref="finder"
      class="finder"
      :pos="finderInitPos"
      :playgroundSize="playerSize"
      :square="square"
      @mouseenter.native="onMouseEnter"
      @mouseleave.native="onMouseLeave"
      @change="onFinderChanged">
      <div class="corner c1"></div>
      <div class="corner c2"></div>
      <div class="corner c3"></div>
      <div class="corner c4"></div>
      <div v-show="hovering" class="square" @click="onSquareClicked"></div>
      <div v-show="hovering" class="corner2 c1"></div>
      <div v-show="hovering" class="corner2 c2"></div>
      <div v-show="hovering" class="corner2 c3"></div>
      <div v-show="hovering" class="corner2 c4"></div>
      <div v-if="generating">正在生成GIF</div>
    </draggable>
    <div class="mask" :style="maskStyle1"></div>
    <div class="mask" :style="maskStyle2"></div>
    <div class="mask" :style="maskStyle3"></div>
    <div class="mask" :style="maskStyle4"></div>
  </div>
</template>

<script>
import Draggable from 'src/capture/components/draggable/index.vue';

export default {
  components: { Draggable },

  props: {
    playerSize: {
      type: Object,
      required: true,
    },
    generating: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    square: true,
    hovering: false,
    finderInitPos: {
      left: 100,
      top: 100,
      width: 260,
      height: 260,
    },
    finderPos: null,
  }),

  computed: {
    maskStyle1 () {
      return { top: 0, left: 0, width: `${this.playerSize.width}px`, height: `${this.finderPos.top}px` };
    },
    maskStyle2 () {
      return {
        bottom: 0,
        left: 0,
        width: `${this.playerSize.width}px`,
        height: `${Math.max(this.playerSize.height - this.finderPos.top - this.finderPos.height, 0)}px`,
      };
    },
    maskStyle3 () {
      return {
        top: `${this.finderPos.top}px`,
        left: 0,
        width: `${this.finderPos.left}px`,
        height: `${this.finderPos.height}px`,
      };
    },
    maskStyle4 () {
      return {
        top: `${this.finderPos.top}px`,
        right: 0,
        width: `${this.playerSize.width - this.finderPos.left - this.finderPos.width}px`,
        height: `${this.finderPos.height}px`,
      };
    },
  },

  created () {
    this.finderPos = Object.assign({}, this.finderInitPos);
  },

  methods: {
    onMouseEnter () {
      this.hovering = true;
    },
    onMouseLeave () {
      this.hovering = false;
    },
    onSquareClicked () {
      this.square = !this.square;
    },
    onFinderChanged (pos) {
      this.finderPos = pos;
      this.$emit('change', pos);
    },
  },
};
</script>

<style scoped>
  .finder-wrapper {
    position: absolute;
    left: 0;
  }
  .mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .finder {
    position: absolute;
  }
  .finder:hover {
    cursor: pointer;
  }
  .corner {
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: transparent;
  }
  .corner.c1 {
    top: 0;
    left: 0;
    border-left: 2px solid white;
    border-top: 2px solid white;
  }
  .corner.c2 {
    top: 0;
    right: 0;
    border-right: 2px solid white;
    border-top: 2px solid white;
  }
  .corner.c3 {
    bottom: 0;
    left: 0;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
  }
  .corner.c4 {
    bottom: 0;
    right: 0;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
  }
  .square {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 50%;
    margin-left: -12px;
    top: 10px;
    background-color: white;
  }
  .corner2 {
    position: absolute;
    width: 0;
    height: 0;
  }
  .corner2.c1 {
    top: 0;
    left: 0;
    border-right: 20px solid transparent;
    border-top: 20px solid white;
  }
  .corner2.c2 {
    top: 0;
    right: 0;
    border-left: 20px solid transparent;
    border-top: 20px solid white;
  }
  .corner2.c3 {
    bottom: 0;
    left: 0;
    border-right: 20px solid transparent;
    border-bottom: 20px solid white;
  }
  .corner2.c4 {
    bottom: 0;
    right: 0;
    border-left: 20px solid transparent;
    border-bottom: 20px solid white;
  }
</style>
