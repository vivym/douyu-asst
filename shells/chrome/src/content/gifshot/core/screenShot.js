const AnimatedGIF = require('./AnimatedGIF');

class ScreenShot {
  constructor (options = {}) {
    this.video = options.video;
    this.crop = options.crop;
    this.filter = options.filter;
    this.start = options.start;
    this.end = options.end;
    this.waitBetweenFrames = options.interval * 1000;
    this.canvas = document.createElement('canvas');
    this.canvas.width = options.gifWidth;
    this.canvas.height = options.gifHeight;
    console.log(options);
    this.ctx = this.canvas.getContext('2d');
    this.ag = new AnimatedGIF(options);
  }

  async getGIF () {
    const captureSingleFrame = (resolve, reject) => {
      const drawVideo = () => {
        try {
          this.ctx.filter = this.filter;
          const { sx, sy, swidth, sheight, x, y, width, height } = this.crop;
          this.ctx.drawImage(this.video, sx, sy, swidth, sheight, x, y, width, height);
          console.log(this.video.currentTime);

          finishCapture();
        } catch (err) {
          if (err.name === 'NS_ERROR_NOT_AVAILABLE') {
            setTimeout(drawVideo, 100);
          } else {
            console.log(this.ctx);
            throw err;
          }
        }
      };

      const finishCapture = () => {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        this.ag.addFrameImageData(imageData);

        if (this.video.currentTime < this.end) {
          setTimeout(captureSingleFrame, this.waitBetweenFrames, resolve, reject);
        }

        if (this.video.currentTime >= this.end) {
          this.ag.getBase64GIF(resolve);
        }
      };

      drawVideo();
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(this.start, this.video.currentTime);
        // this.video.currentTime = this.start;
        // setTimeout(() => this.video.play(), 0);
        setTimeout(captureSingleFrame, 100, resolve, reject);
      }, 500);
    });
  }
};

module.exports = ScreenShot;
