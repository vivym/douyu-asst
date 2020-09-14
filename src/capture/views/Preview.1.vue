<template>
  <div class="preview-wrapper">
    <div class="header">
      <span class="title">预览窗口</span>
      <div class="close-btn" @click="close">
        <img src="https://static.jiuwozb.com/assets/images/tsbox/close.png" />
      </div>
    </div>
    <div class="video-wrapper">
      <video ref="video" class="video" :style="videoStyle" />
    </div>
    <div class="footer">
      <div class="btn red" @click="genGIF">生成GIF图</div>
      <div class="btn orange">保存到手机</div>
      <div class="btn orange">更多GIF图</div>
    </div>
  </div>
</template>

<script>
const gifshot = require('gifshot');

export default {
  props: {
    finderPos: {
      type: Object,
      required: true,
    },
    playerSize: {
      type: Object,
      required: true,
    },
  },
  computed: {
    videoStyle () {
      const scale = 260 / this.finderPos.width;
      return {
        width: `${this.playerSize.width * scale}px`,
        height: `${this.playerSize.height * scale}px`,
        left: `${-this.finderPos.left * scale}px`,
        top: `${-this.finderPos.top * scale}px`,
      };
    },
  },
  mounted () {
    this.dyVideo = document.querySelector('#__video2');
    if (this.dyVideo) {
      this.$refs.video.muted = true;
      const stream = this.dyVideo.captureStream();
      if (stream.removeTrack) {
        stream.getAudioTracks().forEach(track => stream.removeTrack(track));
      }
      console.log(stream);
      this.$refs.video.srcObject = stream;
      this.$refs.video.play();
    }
  },

  beforeDestroy () {
    this.$refs.video.srcObject = null;
  },

  methods: {
    close () {
      this.$emit('close');
    },
    genGIF () {
    },
  },
};
</script>

<style scoped>
  .preview-wrapper {
    box-sizing: border-box;
    position: absolute;
    right: -347px;
    top: -410px;
    width: 336px;
    height: 410px;
    z-index: 6000;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgb(229, 228, 228);
  }
  .video-wrapper {
    position: relative;
    margin-top: 5px;
    margin-bottom: 15px;
    width: 260px;
    height: 260px;
    overflow: hidden;
  }
  .video {
    background-color: black;
    position: absolute;
    width: 704px;
    height: 396px;
  }
  .header {
    box-sizing: border-box;
    width: 336px;
    display: flex;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .footer {
    box-sizing: border-box;
    width: 336px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
  }
  .btn {
    box-sizing: border-box;
    line-height: 36px;
    height: 36px;
    font-size: 15px;
    color: white;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .btn.red {
    background-image: linear-gradient(-180deg, #EE5941 0%, #DF3B2A 98%);
    border: 1px solid #9A2518;
  }
  .btn.orange {
    background-image: linear-gradient(-180deg, #FFB636 3%, #FF8700 98%);
    border: 1px solid #B36000;
  }
  .btm:hover {
    cursor: pointer;
  }
  .close-btn img {
    width: 20px;
    height: 20px;
  }
  .close-btn:hover {
    cursor: pointer;
  }
</style>
