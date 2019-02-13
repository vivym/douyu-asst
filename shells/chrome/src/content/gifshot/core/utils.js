module.exports = {
  mergeOptions (defaultOptions, options) {
    const newOptions = {};
    Object.keys(defaultOptions).forEach(key => (newOptions[key] = defaultOptions[key]));
    Object.keys(options).forEach(key => (newOptions[key] = options[key]));
  },
};
