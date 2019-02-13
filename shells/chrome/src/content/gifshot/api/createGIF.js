const defaultOptions = require('../core/defaultOptions');
const utils = require('../core/utils');
const createGIFFromVideo = require('../core/createGIFFromVideo');

async function createGIF (userOptions = {}) {
  const options = utils.mergeOptions(defaultOptions, userOptions);
  options.gifWidth = Math.floor(options.gifWidth);
  options.gifHeight = Math.floor(options.gifHeight);

  if (options.video) {
    return createGIFFromVideo(options);
  }
};

module.exports = createGIF;
