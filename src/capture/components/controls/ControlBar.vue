<template>
  <div class="control-bar-wrapper">
    <span ref="slider" class="slider"></span>
    <span class="range" :style="rangeStyle"></span>
    <DragButton2 class="current" :value="current" @change="changeCurrent">
      <img src="http://static.jiuwozb.com/assets/images/capture/triangle.png" />
    </DragButton2>
    <drag-button class="anchor" v-model="value1">
      <img src="http://static.jiuwozb.com/assets/images/capture/triangle.png" />
    </drag-button>
    <drag-button class="anchor" v-model="value2">
      <img src="http://static.jiuwozb.com/assets/images/capture/triangle.png" />
    </drag-button>
  </div>
</template>

<script>
import DragButton from './DragButton.vue';
import DragButton2 from './DragButton2.vue';

export default {
  components: { DragButton, DragButton2 },

  props: {
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 100,
    },
    current: {
      type: Number,
      default: 10,
    },
    step: {
      type: Number,
      default: 1,
    },
    initialized: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    value1: 0,
    value2: 20,
    sliderDisabled: false,
    sliderSize: 604,
  }),

  computed: {
    precision() {
      const precisions = [this.start, this.end, this.step].map(item => {
        const decimal = ('' + item).split('.')[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    },
    anchor1Position () {
      return (this.value1 - this.start) / (this.end - this.start) * 100;
    },
    anchor2Position () {
      return (this.value2 - this.start) / (this.end - this.start) * 100;
    },
    rangeStyle () {
      const v1 = this.anchor1Position;
      const v2 = this.anchor2Position;
      return { left: `${ Math.min(v1, v2) }%`, right: `${ 100 - Math.max(v1, v2) }%` };
    },
  },

  watch: {
    current (value) {
      if (this.initialized) {
        if (value > Math.max(this.value1, this.value2) || value < Math.min(this.value1, this.value2)) {
          console.log('reset');
          this.$emit('reset');
        }
      }
    },
    value1 (value) {
      console.log('value1', value);
    },
    value2 (value) {
      console.log('value2', value);
    },
    initialized (value) {
      if (value) {
        this.value1 = this.start;
        this.value2 = Math.min(this.start + 15, this.end);
      }
    },
  },

  mounted () {
    this.resetSize();
    window.addEventListener('resize', this.resetSize);
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resetSize);
  },

  methods: {
    resetSize () {
      if (this.$refs.slider) {
        this.sliderSize = this.$refs.slider.clientWidth;
      }
    },
    emitChange () {
      this.$emit('change', [ this.value1, this.value2 ]);
    },
    setCurrent () {

    },
    changeCurrent (e) {
      this.$emit('changeCurrent', e);
    },
  },
};
</script>


<style scoped>
  .control-bar-wrapper {
    position: relative;
    height: 8px;
  }
  .slider {
    position: absolute;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    background-color: #eabcdf;
    z-index: -1;
  }
  .range {
    position: absolute;
    height: 100%;
    background-color: aquamarine;
  }
  .current {
    position: absolute;    
  }
  .current:hover {
    cursor: pointer;
  }
  .current img {
    height: 18px;
    width: 18px;
  }
  .anchor {
    position: absolute;
    top: 8px;
  }
  .anchor:hover {
    cursor: pointer;
  }
  .anchor img {
    height: 18px;
    width: 18px;
  }
</style>
