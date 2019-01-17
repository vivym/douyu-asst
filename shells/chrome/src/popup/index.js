import { initPopup } from 'src/popup';

initPopup({
  mixin: {
    methods: {
      createTab: chrome.tabs.create,
    },
  },
});
