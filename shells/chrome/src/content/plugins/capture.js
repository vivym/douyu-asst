const Plugin = require('./plugin');
const { waitForDom, waitForObj, injectRemoteJS } = require('../../utils');

class CapturePlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
  }

  grant () {
    return true;
  }

  appendTitleBottomButton (el, content, width, iconUrl, onclick) {
    const span = document.createElement('span');
    span.className = 'Title-blockInline';
    const div = document.createElement('div');
    div.style.width = `${width}px`;
    div.style.height = '24px';
    div.style.marginLeft = '15px';
    div.style.zIndex = '104';
    div.style.position = 'relative';
    div.style.borderLeft = '1px solid #eaeaeb';
    div.style.display = 'flex';
    div.style.flexDirection = 'row';
    div.style.alignItems = 'center';
    div.className = 'PhoneWatch-tit';
    div.onclick = onclick;
    span.append(div);
    const img = document.createElement('img');
    img.src = iconUrl;
    img.style.width = '20px';
    img.style.height = '20px';
    img.style.marginRight = '8px';
    img.style.marginLeft = '15px';
    const txt = document.createElement('span');
    txt.style.color = '#2c3e50';
    txt.style.lineHeight = '24px';
    txt.style.textAlign = 'center';
    txt.style.fontSize = '13px';
    txt.innerText = content;
    div.append(img, txt);
    const invisibleSpan = document.createElement('span');
    invisibleSpan.className = 'Title-blockInline Title-invisible';
    el.append(span, invisibleSpan);
  }

  hookMediaHandler (mediaHandler) {
    const videoBackTime = 30;
    const videoBackTimeThreshold = 60;
    mediaHandler._removeBuffer = function () {
      if (this._video && !window.dyasstStopRemoveVideoBuffer) {
        const { currentTime } = this._video;
        const { sourceBuffers } = this._mediaSource;
        for (const sourceBuffer of sourceBuffers) {
          if (!sourceBuffer.updating) {
            const { buffered } = sourceBuffer;
            if (buffered.length > 0) {
              if (buffered.length > 1) {
                const a = Math.max(buffered.start(0) - 0.1, 0);
                const s = buffered.end(0) + 0.1;
                if (s < currentTime) {
                  sourceBuffer.remove(a, s);
                }
              } else {
                const a = Math.max(buffered.start(0) - 0.1, 0);
                if (currentTime - a > videoBackTimeThreshold) {
                  const s = currentTime - videoBackTime;
                  sourceBuffer.remove(a, s);
                }
              }
            }
          }
        }
      }
    };
    mediaHandler._checkPlayStuck = function () {
      if (this._checkStuckTimer) {
        clearTimeout(this._checkStuckTimer);
      }
    };
  }

  hookVideoModule (videoModule) {
    videoModule.checkBuffer = function () {};
  }

  install () {
    window.dyasstStopRemoveVideoBuffer = false;
    waitForObj(window, 'H5PlayerVideoLib').then(() => {
      const lib = window.H5PlayerVideoLib;
      waitForObj(lib, 'getVideo').then(() => {
        const videoWrapper = lib.getVideo();
        waitForObj(videoWrapper, 'modules').then(() => {
          videoWrapper.modules.forEach(mod => {
            if (mod.id === 'videoModule') {
              this.hookVideoModule(mod);
              waitForObj(mod, 'player').then(() => {
                const mediaHandler = mod.player.player._mediaHandler;
                this.hookMediaHandler(mediaHandler);
              });
            }
          });
        });
      });
    });
    waitForDom('.Title-roomOtherBottom').then(el => {
      this.appendTitleBottomButton(el, '录制GIF', 84,
        'http://static.jiuwozb.com/assets/images/capture/video.png',
        () => window.dyasstShowCapture());
      this.appendTitleBottomButton(el, '主播表情包', 104, 'http://static.jiuwozb.com/assets/images/capture/video.png');
    });
    waitForDom('.PlayerToolbar').then(el => {
      const wrapper = document.createElement('div');
      wrapper.id = 'dyasst-capture';
      el.append(wrapper);
      injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/capture.js');
    });
  }
};

module.exports = CapturePlugin;
