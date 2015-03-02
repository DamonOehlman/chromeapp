module.exports = function() {
  var runtime = typeof chrome != 'undefined' && chrome.runtime;
  return runtime && typeof runtime.getManifest == 'function' && runtime.getManifest();
};
