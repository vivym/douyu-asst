const Plugin = require('./plugin');
const { waitForDom, waitForObj, injectRemoteJS } = require('../../utils');

class CapturePlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
    this.data = [];
  }

  grant () {
    return true;
  }

  push (data) {
    console.log(data);
    this.data.push(data);
    while (this.data.length > 30) {
      this.data.shift();
    }
  }

  startRecording (stream) {
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9,opus' });
    recorder.ondataavailable = evt => this.push(evt.data);
    recorder.start(1000);
  }

  install () {
    waitForDom('body').then(() => {
      const wrapper = document.createElement('div');
      wrapper.id = 'dyasst-capture';
      document.body.insertBefore(wrapper, document.body.firstElementChild);

      injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/capture.js');
    });
    waitForDom('video').then(videoEl => {
      waitForObj(videoEl, 'currentTime').then(() => {
        // this.startRecording(videoEl.captureStream());
      });
    });

    window.dyasstGetCapturedVideo = () => {
      return this.data;
      // return new Blob(this.data, { type: 'video/webm; codecs=vp9' });
    };
  }
};

module.exports = CapturePlugin;
