async function sleep (timeout) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout));
}

function injectRemoteJS (url) {
  const script = document.createElement('script');
  script.src = url;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

function playAudio (src, vol) {
  if (vol > 0) {
    const audio = new Audio();
    audio.src = src;
    audio.volume = vol;
    audio.play();
  }
}

async function waitForObj (obj, key, interval = 100) {
  while (true) {
    if (obj[key]) {
      return;
    }
    await sleep(interval);
  }
}

module.exports = {
  sleep,
  injectRemoteJS,
  playAudio,
  waitForObj,
};
