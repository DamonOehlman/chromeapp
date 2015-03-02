module.exports = function() {
  var storage = typeof chrome != 'undefined' ? chrome.storage : null;
  return storage ? storage.local : localStorage;
};
