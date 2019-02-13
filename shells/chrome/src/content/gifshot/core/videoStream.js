class VideoStream {
  constructor () {
    this.loadedData = false;
    this.defaultVideoDimensions = { width: 640, height: 480 };
    this.attempts = 0;
  }

  startStreaming () {
  }

  findVideoSize (obj) {
  }
};

module.exports = VideoStream;
