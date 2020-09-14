const frameWorkerCode = require('./processFrameWorker');
const NeuQuant = require('../dependencies/NeuQuant');
const GifWriter = require('../dependencies/gifWriter');

const noop = () => {};

class AnimatedGIF {
  constructor (options) {
    this.repeat = 0;
    this.frames = [];
    this.numRenderedFrames = 0;
    this.onRenderCompleteCallback = noop;
    this.onRenderProgressCallback = noop;
    this.workers = [];
    this.availableWorkers = [];
    this.generatingGIF = false;
    this.options = options;
    this.workerMethods = frameWorkerCode();

    this.initWebWorker(options);

    this.byteMap = (() => {
      let byteMap = [];

      for (let i = 0; i < 256; i++) {
        byteMap[i] = String.fromCharCode(i);
      }

      return byteMap;
    })();
  }

  initWebWorker (options) {
    const processFrameWorkerCode = NeuQuant.toString() + '(' + frameWorkerCode.toString() + '());';
    let numWorkers = options.numWorkers;

    for (let _ = 0; _ < numWorkers; ++_) {
      const workerObj = this.createWebWorker(processFrameWorkerCode);

      if (workerObj instanceof Error) {
        throw workerObj;
      } else {
        this.workers.push(workerObj);
        this.availableWorkers.push(workerObj.worker);
      }
    }
    this.frames = [];
  }

  getWorker () {
    return this.availableWorkers.pop();
  }

  freeWorker (worker) {
    return this.availableWorkers.push(worker);
  }

  bufferToString (buffer) {
    const numberValues = buffer.length;
    let str = '';
    let x = -1;

    while (++x < numberValues) {
      str += this.byteMap[buffer[x]];
    }

    return str;
  }

  onFrameFinished (progressCallback) {
    // The GIF is not written until we're done with all the frames
    // because they might not be processed in the same order
    const self = this;
    const frames = self.frames;
    const options = self.options;
    const hasExistingImages = !!(options.images || []).length;
    const allDone = frames.every((frame) => {
      return (
        !frame.beingProcessed &&
        frame.done
      );
    });

    self.numRenderedFrames++;

    if (hasExistingImages) {
      progressCallback(self.numRenderedFrames / frames.length);
    }

    self.onRenderProgressCallback(self.numRenderedFrames * 0.75 / frames.length);

    if (allDone) {
      if (!self.generatingGIF) {
        self.generateGIF(frames, self.onRenderCompleteCallback);
      }
    } else {
      setTimeout(() => self.processNextFrame(), 1);
    }
  }

  processFrame (position) {
    const AnimatedGifContext = this;
    const {
      progressCallback,
      sampleInterval,
    } = this.options;
    const frames = this.frames;
    let frame;
    let worker;
    const done = (ev = {}) => {
      const data = ev.data;

      // Delete original data, and free memory
      delete frame.data;

      frame.pixels = Array.prototype.slice.call(data.pixels);
      frame.palette = Array.prototype.slice.call(data.palette);
      frame.done = true;
      frame.beingProcessed = false;

      AnimatedGifContext.freeWorker(worker);

      AnimatedGifContext.onFrameFinished(progressCallback);
    };

    frame = frames[position];

    if (frame.beingProcessed || frame.done) {
      this.onFrameFinished();

      return;
    }

    frame.sampleInterval = sampleInterval;
    frame.beingProcessed = true;
    frame.gifshot = true;

    worker = this.getWorker();

    if (worker) {
      // Process the frame in a web worker
      worker.onmessage = done;
      worker.postMessage(frame);
    } else {
      // Process the frame in the current thread
      done({
        data: AnimatedGifContext.workerMethods.run(frame),
      });
    }
  }

  startRendering (completeCallback) {
    this.onRenderCompleteCallback = completeCallback;

    for (let i = 0; i < this.options.numWorkers && i < this.frames.length; i++) {
      this.processFrame(i);
    }
  }

  processNextFrame () {
    let position = -1;

    for (let i = 0; i < this.frames.length; i++) {
      const frame = this.frames[i];

      if (!frame.done && !frame.beingProcessed) {
        position = i;
        break;
      }
    }

    if (position >= 0) {
      this.processFrame(position);
    }
  }

  // Takes the already processed data in frames and feeds it to a new
  // GifWriter instance in order to get the binary GIF file
  generateGIF (frames, callback) {
    // TODO: Weird: using a simple JS array instead of a typed array,
    // the files are WAY smaller o_o. Patches/explanations welcome!
    let buffer = []; // new Uint8Array(width * height * frames.length * 5);
    let gifOptions = {
      loop: this.repeat,
    };
    const options = this.options;
    const {
      interval,
    } = options;
    const frameDuration = options.frameDuration;
    const existingImages = options.images;
    const hasExistingImages = !!(existingImages.length);
    const height = options.gifHeight;
    const width = options.gifWidth;
    const gifWriter = new GifWriter(buffer, width, height, gifOptions);
    const onRenderProgressCallback = this.onRenderProgressCallback;
    const delay = hasExistingImages ? interval * 100 : 0;
    let bufferToString;
    let gif;

    this.generatingGIF = true;

    frames.forEach(frame => {
      const framePalette = frame.palette;

      onRenderProgressCallback(0.75 + 0.25 * frame.position * 1.0 / frames.length);

      for (let i = 0; i < frameDuration; i++) {
        gifWriter.addFrame(0, 0, width, height, frame.pixels, {
          palette: framePalette,
          delay: delay,
        });
      }
    });

    gifWriter.end();

    onRenderProgressCallback(1.0);

    this.frames = [];

    this.generatingGIF = false;

    if (callback) {
      bufferToString = this.bufferToString(buffer);
      gif = 'data:image/gif;base64,' + window.btoa(bufferToString);

      callback(gif);
    }
  }

  // From GIF: 0 = loop forever, null = not looping, n > 0 = loop n times and stop
  setRepeat (r) {
    this.repeat = r;
  }

  isElement (elem) {
    return (
      elem &&
      elem.nodeType === 1
    );
  }

  removeElement (node) {
    if (!this.isElement(node)) {
      return;
    }
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  getFontSize (options = {}) {
    if (!document.body || (options.resizeFont === false)) {
      return options.fontSize;
    }

    let text = options.text;
    let containerWidth = options.gifWidth;
    let fontSize = parseInt(options.fontSize, 10);
    let minFontSize = parseInt(options.minFontSize, 10);
    const div = document.createElement('div');
    const span = document.createElement('span');

    div.setAttribute('width', containerWidth);
    div.appendChild(span);

    span.innerHTML = text;
    span.style.fontSize = fontSize + 'px';
    span.style.textIndent = '-9999px';
    span.style.visibility = 'hidden';

    document.body.appendChild(span);

    while (span.offsetWidth > containerWidth && fontSize >= minFontSize) {
      span.style.fontSize = --fontSize + 'px';
    }

    document.body.removeChild(span);

    return fontSize + 'px';
  }

  getExtension (src) {
    return src.substr(src.lastIndexOf('.') + 1, src.length);
  }

  addFrame (element, gifshotOptions, frameText) {
    gifshotOptions = gifshotOptions || {};

    const self = this;
    const ctx = self.ctx;
    const options = self.options;
    const width = options.gifWidth;
    const height = options.gifHeight;
    const fontSize = this.getFontSize(gifshotOptions);
    const {
      filter,
      fontColor,
      fontFamily,
      fontWeight,
      text,
      textAlign,
      textBaseline,
      waterMark,
      waterMarkHeight,
      waterMarkWidth,
      waterMarkXCoordinate,
      waterMarkYCoordinate,
    } = gifshotOptions;
    const textXCoordinate = gifshotOptions.textXCoordinate ? gifshotOptions.textXCoordinate : textAlign === 'left' ? 1 : textAlign === 'right' ? width : width / 2;
    const textYCoordinate = gifshotOptions.textYCoordinate ? gifshotOptions.textYCoordinate : textBaseline === 'top' ? 1 : textBaseline === 'center' ? height / 2 : height;
    const font = fontWeight + ' ' + fontSize + ' ' + fontFamily;
    const textToUse = (frameText && gifshotOptions.showFrameText) ? frameText : text;
    let imageData;

    try {
      ctx.filter = filter;

      ctx.drawImage(element, 0, 0, width, height);

      if (textToUse) {
        ctx.font = font;
        ctx.fillStyle = fontColor;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillText(textToUse, textXCoordinate, textYCoordinate);
      }
      if (waterMark) {
        ctx.drawImage(waterMark, waterMarkXCoordinate, waterMarkYCoordinate, waterMarkWidth, waterMarkHeight);
      }
      imageData = ctx.getImageData(0, 0, width, height);

      self.addFrameImageData(imageData);
    } catch (e) {
      return '' + e;
    }
  }

  addFrameImageData (imageData = {}) {
    const frames = this.frames;
    const imageDataArray = imageData.data;

    this.frames.push({
      data: imageDataArray,
      width: imageData.width,
      height: imageData.height,
      palette: null,
      dithering: null,
      done: false,
      beingProcessed: false,
      position: frames.length,
    });
  }

  onRenderProgress (callback) {
    this.onRenderProgressCallback = callback;
  }

  isRendering () {
    return this.generatingGIF;
  }

  createWebWorker (content) {
    if (typeof content !== 'string') {
      return;
    }

    try {
      const blob = new Blob([content], { type: 'text/javascript' });
      const objUrl = URL.createObjectURL(blob);
      const worker = new Worker(objUrl);

      return { objUrl, worker };
    } catch (err) {
      return err;
    }
  }

  getBase64GIF (completeCallback) {
    const self = this;
    const onRenderComplete = gif => {
      self.destroyWorkers();

      setTimeout(() => completeCallback(gif), 0);
    };

    self.startRendering(onRenderComplete);
  }

  destroyWorkers () {
    const workers = this.workers;

    // Explicitly ask web workers to die so they are explicitly GC'ed
    workers.forEach(obj => {
      const { objUrl, worker } = obj;

      worker.terminate();
      URL.revokeObjectURL(objUrl);
    });
  }
};

module.exports = AnimatedGIF;
