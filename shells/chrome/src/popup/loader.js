const script = document.createElement('script');

if (process && process.env && process.env.NODE_ENV === 'production') {
  script.src = 'https://static.jiuwozb.com/tsbuild/popup/index.js';
} else {
  script.src = chrome.extension.getURL('build/popup/index.js');
}

document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
