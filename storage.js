module.exports = function() {
  var chromeStorage = typeof chrome != 'undefined' ? chrome.storage : null;
  var isApp = !!chromeStorage;
  var storage = isApp ? chromeStorage.local : localStorage;

  return {
    get: function(key, callback) {
      function getVal(cb) {
        if (isApp) {
          return storage.get(key, function(values) {
            cb(null, values[0]);
          });
        }

        cb(null, storage.getItem(key));
      }

      return callback ? getVal(callback) : getVal;
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
