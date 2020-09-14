<template>
  <div class="controls-wrapper">
    <div class="control-row">
      <div class="control-btn" @click="pause">
        <img v-if="isPaused" src="http://static.jiuwozb.com/assets/images/capture/play.png" />
        <img v-else src="http://static.jiuwozb.com/assets/images/capture/pause.png" />
      </div>
      <control-bar
        ref="controlBar"
        class="control-bar"
        :start="start"
        :end="end"
        :current="currentTime"
        :disabled="disabled"
        :initialized="initialized"
        @reset="reset"
        @changeCurrent="changeCurrent">
      </control-bar>
      <div class="control-btn" @click="reset">
        <img src="http://static.jiuwozb.com/assets/images/capture/replay.png" />
      </div>
    </div>
  </div>
</template>

<script>
import ControlBar from 'src/capture/components/controls/ControlBar.vue';

export default {
  components: { ControlBar },

  data: () => ({
    isPaused: false,
    start: 0,
    end: 0,
    currentTime: 0,
    video: null,
    initialized: false,
    disabled: false,
  }),

  created () {
    this.video = document.querySelector('#__video2');
    if (this.video) {
      this.onTimeUpdate();
      this.video.addEventListener('timeupdate', this.onTimeUpdate);
    }
  },

  beforeDestroy () {
    if (this.video) {
      this.video.removeEventListener('timeupdate', this.onTimeUpdate);
      this.video = null;
    }
  },

  methods: {
    startGenGIF (crop) {
      if (this.video) {
        this.disabled = true;
        const { value1, value2 } = this.$refs.controlBar;
        const start = Math.min(value1, value2);
        const end = Math.max(value1, value2);
        this.reset();
        return this.$gifshot.createGIF({
          video: this.video,
          start,
          end,
          crop,
          gifWidth: 260,
          gifHeight: 260,
        });
      }
    },
    pause () {
      if (this.video) {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
          this.video.pause();
        } else {
          this.video.play();
        }
      }
    },
    onTimeUpdate () {
      if (this.video) {
        if (!this.initialized) {
          const { buffered, currentTime } = this.video;
          this.start = Math.floor(Math.max(buffered.start(0), currentTime - 40) + 0.5);
          this.end = this.start + 60;
          this.video.currentTime = this.start + 1;
          this.$nextTick(() => {
            this.initialized = true;
          });
        }
        this.currentTime = this.video.currentTime;
      }
    },
    reset () {
      if (this.video) {
        const { value1, value2 } = this.$refs.controlBar;
        const start = Math.min(value1, value2);
        const end = Math.max(value1, value2);
        this.currentTime = start + 0.1;
        this.video.currentTime = this.currentTime;
        this.video.play();
      }
    },
    changeCurrent (e) {
      if (this.video) {
        this.video.currentTime = e;
      }
    },
  },
};
</script>

<style scoped>
  .controls-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgb(229, 228, 228);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .control-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
  .control-btn img {
    width: 24px;
    height: 24px;
  }
  .control-btn:hover {
    cursor: pointer;
  }
  .control-bar {
    flex: 1;
    background-color: bisque;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
