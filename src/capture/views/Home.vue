<template>
  <div :class="['home-wrapper', show ? '' : 'hidden']">
    <div class="panel-wrapper">
      <img class="close-btn"
            src="https://static.jiuwozb.com/assets/images/capture/icon_close.png"
            @click="close" />
      <div class="input-panel">
        <el-row>
          <el-col class="title">原始视图</el-col>
        </el-row>
        <video ref="inputVideo" controls></video>
        <div class="controls">
          <img class="control-btn"
                :src="controlBtnIconUrl"
                @click="pause" />
        </div>
        <div class="info-panel">
          <div class="col">
            <i>开始时间</i>
            <div class="time-input">00:03</div>
          </div>
          <div class="col">
            <i>结束时间</i>
            <div class="time-input">00:15</div>
          </div>
          <div class="col">
            <i>截取长度</i>
            <div class="time-input red">00:12</div>
          </div>
        </div>
      </div>
      <div class="output-panel">
        <el-row>
          <el-col class="title">预览视图</el-col>
        </el-row>
        <video class="previewVideo"></video>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    paused: false,
    startTime: 3,
    endTime: 15,
  }),

  computed: {
    controlBtnIconUrl () {
      return this.paused ? 'https://static.jiuwozb.com/assets/images/capture/icon_play.png' :
        'https://static.jiuwozb.com/assets/images/capture/icon_pause.png';
    },
  },

  mounted () {
    window.dyasstShowCapturePanel = (data, show) => {
      this.show = show === undefined ? !this.show : show;
      if (this.show) {
        const videoEl = this.$refs.inputVideo;
        videoEl.src = URL.createObjectURL(new Blob(data));
        videoEl.play();
        /*
        const mediaSource = new MediaSource();
        videoEl.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', () => {
          const mime = 'video/webm; codecs=vp9';
          const sourceBuffer = mediaSource.addSourceBuffer(mime);
          const videoReader = new FileReader();
          videoReader.addEventListener('loadend', e => {
            console.log('loadend');
            sourceBuffer.appendBuffer(e.srcElement.result);
            sourceBuffer.addEventListener('updateend', () => {
              console.log('updateend');
              videoEl.play();
            });
          });
          videoReader.readAsArrayBuffer(new Blob(data));
        });
        */
      }
    };
    window.updateVideo = (data) => {
      const videoEl = this.$refs.video;
      videoEl.src = URL.createObjectURL(data);
      videoEl.play();
      /*
      const mediaSource = new MediaSource();
      videoEl.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener('sourceopen', () => {
        console.log('here');
        const mime = 'video/webm; codecs=vp8';
        const sourceBuffer = mediaSource.addSourceBuffer(mime);
        const videoReader = new FileReader();
        videoReader.addEventListener('loadend', e => {
          sourceBuffer.appendBuffer(e.srcElement.result);
        });
        videoReader.readAsArrayBuffer(data);
      });
      */
    };
  },

  methods: {
    close () {
      this.show = false;
    },
    pause () {
      this.paused = !this.paused;
    },
  },
};
</script>

<style scoped>
  .home-wrapper {
    background-color: rgba(0, 0, 0, .6);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .panel-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -350px;
    margin-top: -205px;
    width: 700px;
    height: 410px;
    background-color: white;
    z-index: 10;
    pointer-events: all;
    display: flex;
    flex-direction: row;
    padding: 33px 20px 20px 20px;
    box-sizing: border-box;
  }
  .hidden {
    visibility: hidden;
  }
  .video-src {
    width: 400px;
    height: 300px;
  }
  .close-btn {
    width: 30px;
    height: 30px;
    position: absolute;
    right: -40px;
    top: 13px;
  }
  .close-btn:hover {
    cursor: pointer;
  }
  .input-panel {
    flex-direction: column;
    align-items: stretch;
  }
  .input-panel .title {
    font-size: 16px;
    line-height: 22px;
  }
  .input-panel video {
    width: 400px;
    height: 225px;
    background-color: black;
    margin-top: 10px;
  }
  .output-panel {
    margin-left: 35px;
  }
  .output-panel .title {
    font-size: 16px;
    line-height: 22px;
  }
  .controls {
    margin-top: 5px;
    flex-direction: row;
  }
  .control-btn {
    width: 16px;
    height: 16px;
  }
  .info-panel {
    display: flex;
    margin-top: 23px;
    flex-direction: row;
    justify-content: space-between;
  }
  .info-panel i {
    color: #888888;
    font-size: 14px;
    line-height: 20px;
  }
  .info-panel .col {
    display: flex;
    flex-direction: row;
  }
  .time-input {
    color: #888888;
    background-color: #f4f4f4;
    width: 60px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    margin-left: 5px;
    font-size: 14px;
  }
  .time-input.red {
    color: #E04E4F;
  }
  .output-panel video {
    width: 225px;
    height: 225px;
    background-color: black;
    margin-top: 10px;
  }
</style>
