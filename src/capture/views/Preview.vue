<template>
  <div class="preview-wrapper">
    <div class="header">
      <span class="title">预览窗口</span>
      <div class="close-btn" @click="close">
        <img src="https://static.jiuwozb.com/assets/images/tsbox/close.png" />
      </div>
    </div>
    <div class="canvas-wrapper">
      <canvas ref="canvas" class="canvas" width="260" height="260" />
    </div>
    <div class="footer">
      <div class="btn red" @click="genGIF">生成GIF图</div>
      <div class="btn orange">保存到手机</div>
      <div class="btn orange">更多GIF图</div>
    </div>
  </div>
</template>

<script>
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

  data: () => ({
    dyVideo: null,
    ctx: null,
    renderToken: null,
  }),

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
    this.initializePreview();
  },

  beforeDestroy () {
    this.dyVideo = null;
    this.ctx = null;
    if (this.renderToken) {
      clearInterval(this.renderToken);
    }
  },

  methods: {
    initializePreview () {
      this.dyVideo = document.querySelector('#__video2');
      if (this.dyVideo) {
        this.ctx = this.$refs.canvas.getContext('2d');
        this.renderToken = setInterval(this.render, 100);
      } else {
        // TODO
      }
    },
    render () {
      if (!this.dyVideo || this.dyVideo.paused || this.dyVideo.ended || !this.ctx) {
        return;
      }

      const { sx, sy, swidth, sheight, x, y, width, height } = this.calcCrop();
      const { canvas } = this.$refs;

      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(this.dyVideo, sx, sy, swidth, sheight, x, y, width, height);
    },
    calcCrop () {
      const { finderPos, dyVideo } = this;
      const { videoWidth, videoHeight, clientWidth, clientHeight } = dyVideo;
      const scaleX = videoWidth / clientWidth;
      const scaleY = videoHeight / clientHeight;
      const finderScale = finderPos.width >= finderPos.height ? 260 / finderPos.width : 260 / finderPos.height;

      return {
        sx: finderPos.left * scaleX,
        sy: finderPos.top * scaleY,
        swidth: videoWidth,
        sheight: videoHeight,
        x: 0,
        y: 0,
        width: videoWidth * finderScale / scaleX,
        height: videoHeight * finderScale / scaleY,
      };
    },
    close () {
      this.$emit('close');
    },
    genGIF () {
      this.$emit('genStart', this.calcCrop());
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
  .canvas-wrapper {
    position: relative;
    margin-top: 5px;
    margin-bottom: 15px;
    width: 260px;
    height: 260px;
  }
  .canvas {
    background-color: black;
    width: 260px;
    height: 260px;
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
