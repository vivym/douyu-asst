const ScreenShot = require('./screenShot');

async function createGIFFromVideo (options) {
  const screenShot = new ScreenShot(options);

  return screenShot.getGIF();
}

module.exports = createGIFFromVideo;
