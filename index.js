var EventEmitter = require('events').EventEmitter;
var Github = require('github-api');
var extend = require('cog/extend');

module.exports = function() {
  var app = new EventEmitter();
  var windows = {};

  function createWindows() {
    var ids = Object.keys(windows).sort();

    ids.forEach(function(id) {
      var data = windows[id];
      var opts = extend({
        id: id,
        bounds: {
          width: 400,
          height: 400
        }
      }, data.opts);

      console.log(data.url, opts);
      chrome.app.window.create(data.url, opts, function() {
        console.log('created window');
      });
    });
  }

  function registerWindow(id, url, opts) {
    windows[id] = { url: url, opts: opts };
  }

  app.on('launched', function() {
    createWindows();
  });

  app.window = registerWindow;
  app.main = registerWindow.bind(null, 'main');

  chrome.app.runtime.onLaunched.addListener(app.emit.bind(app, 'launched'));

  return app;
};
