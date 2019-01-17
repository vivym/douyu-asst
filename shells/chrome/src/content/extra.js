let done = false;
window.postMessage({ source: 'backend_installed' }, '*');
window.addEventListener('message', (evt) => {
  if (evt.source === window && evt.data && evt.data.source === 'setting' && !done) {
    done = true;
    // todo
  }
});
