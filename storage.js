module.exports = function() {
  var chromeStorage = typeof chrome != 'undefined' ? chrome.storage : null;
  var isApp = !!chromeStorage;
  var storage = isApp ? chromeStorage.local : localStorage;

  return {
    get: function(key, callback) {
      if (isApp) {
        return storage.get(key, function(values) {
          callback(null, values[0]);
        });
      }

      callback(null, storage.getItem(key));
    },

    set: function(key, val, callback) {
      var data;
      if (isApp) {
        // create the data object
        data = {};
        data[key] = val;

        return storage.set(data, callback);
      }

      storage.setItem(key, val);
      if (typeof callback == 'function') {
        callback(null, storage.getItem(key));
      };
    }
  };
};
