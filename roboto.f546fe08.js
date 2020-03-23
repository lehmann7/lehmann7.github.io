// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../node_modules/parcel/src/builtins/bundle-url.js"}],"../../vendor/roboto/roboto.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./fonts/roboto-v18-cyrillic-ext-regular.eot":[["roboto-v18-cyrillic-ext-regular.b6141b11.eot","../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.eot"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.eot"],"./fonts/roboto-v18-cyrillic-ext-regular.woff2":[["roboto-v18-cyrillic-ext-regular.d66a737a.woff2","../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.woff2"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.woff2"],"./fonts/roboto-v18-cyrillic-ext-regular.woff":[["roboto-v18-cyrillic-ext-regular.dc3c960d.woff","../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.woff"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.woff"],"./fonts/roboto-v18-cyrillic-ext-regular.ttf":[["roboto-v18-cyrillic-ext-regular.55444ab2.ttf","../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.ttf"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.ttf"],"./fonts/roboto-v18-cyrillic-ext-regular.svg":[["roboto-v18-cyrillic-ext-regular.038ac7de.svg","../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.svg"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-ext-regular.svg"],"./fonts/roboto-v18-cyrillic-regular.eot":[["roboto-v18-cyrillic-regular.b8c401cd.eot","../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.eot"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.eot"],"./fonts/roboto-v18-cyrillic-regular.woff2":[["roboto-v18-cyrillic-regular.d00f6bf4.woff2","../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.woff2"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.woff2"],"./fonts/roboto-v18-cyrillic-regular.woff":[["roboto-v18-cyrillic-regular.75e86592.woff","../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.woff"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.woff"],"./fonts/roboto-v18-cyrillic-regular.ttf":[["roboto-v18-cyrillic-regular.fcdfbd39.ttf","../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.ttf"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.ttf"],"./fonts/roboto-v18-cyrillic-regular.svg":[["roboto-v18-cyrillic-regular.8868edf6.svg","../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.svg"],"../../vendor/roboto/fonts/roboto-v18-cyrillic-regular.svg"],"./fonts/roboto-v18-greek-ext-regular.eot":[["roboto-v18-greek-ext-regular.4b5578df.eot","../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.eot"],"../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.eot"],"./fonts/roboto-v18-greek-ext-regular.woff2":[["roboto-v18-greek-ext-regular.f3e9c8e5.woff2","../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.woff2"],"../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.woff2"],"./fonts/roboto-v18-greek-ext-regular.woff":[["roboto-v18-greek-ext-regular.707261b4.woff","../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.woff"],"../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.woff"],"./fonts/roboto-v18-greek-ext-regular.ttf":[["roboto-v18-greek-ext-regular.13fa06e3.ttf","../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.ttf"],"../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.ttf"],"./fonts/roboto-v18-greek-ext-regular.svg":[["roboto-v18-greek-ext-regular.1ac4fdc9.svg","../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.svg"],"../../vendor/roboto/fonts/roboto-v18-greek-ext-regular.svg"],"./fonts/roboto-v18-greek-regular.eot":[["roboto-v18-greek-regular.e046bbda.eot","../../vendor/roboto/fonts/roboto-v18-greek-regular.eot"],"../../vendor/roboto/fonts/roboto-v18-greek-regular.eot"],"./fonts/roboto-v18-greek-regular.woff2":[["roboto-v18-greek-regular.283775e4.woff2","../../vendor/roboto/fonts/roboto-v18-greek-regular.woff2"],"../../vendor/roboto/fonts/roboto-v18-greek-regular.woff2"],"./fonts/roboto-v18-greek-regular.woff":[["roboto-v18-greek-regular.db069be0.woff","../../vendor/roboto/fonts/roboto-v18-greek-regular.woff"],"../../vendor/roboto/fonts/roboto-v18-greek-regular.woff"],"./fonts/roboto-v18-greek-regular.ttf":[["roboto-v18-greek-regular.8b649543.ttf","../../vendor/roboto/fonts/roboto-v18-greek-regular.ttf"],"../../vendor/roboto/fonts/roboto-v18-greek-regular.ttf"],"./fonts/roboto-v18-greek-regular.svg":[["roboto-v18-greek-regular.91bcd994.svg","../../vendor/roboto/fonts/roboto-v18-greek-regular.svg"],"../../vendor/roboto/fonts/roboto-v18-greek-regular.svg"],"./fonts/roboto-v18-vietnamese-regular.eot":[["roboto-v18-vietnamese-regular.b84d705a.eot","../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.eot"],"../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.eot"],"./fonts/roboto-v18-vietnamese-regular.woff2":[["roboto-v18-vietnamese-regular.1186d65a.woff2","../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.woff2"],"../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.woff2"],"./fonts/roboto-v18-vietnamese-regular.woff":[["roboto-v18-vietnamese-regular.334baa63.woff","../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.woff"],"../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.woff"],"./fonts/roboto-v18-vietnamese-regular.ttf":[["roboto-v18-vietnamese-regular.4c049a81.ttf","../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.ttf"],"../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.ttf"],"./fonts/roboto-v18-vietnamese-regular.svg":[["roboto-v18-vietnamese-regular.345d6159.svg","../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.svg"],"../../vendor/roboto/fonts/roboto-v18-vietnamese-regular.svg"],"./fonts/roboto-v18-latin-ext-regular.eot":[["roboto-v18-latin-ext-regular.1478da65.eot","../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.eot"],"../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.eot"],"./fonts/roboto-v18-latin-ext-regular.woff2":[["roboto-v18-latin-ext-regular.6aa8fe41.woff2","../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.woff2"],"../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.woff2"],"./fonts/roboto-v18-latin-ext-regular.woff":[["roboto-v18-latin-ext-regular.d773fc86.woff","../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.woff"],"../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.woff"],"./fonts/roboto-v18-latin-ext-regular.ttf":[["roboto-v18-latin-ext-regular.3aafa4ef.ttf","../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.ttf"],"../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.ttf"],"./fonts/roboto-v18-latin-ext-regular.svg":[["roboto-v18-latin-ext-regular.ec5fc576.svg","../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.svg"],"../../vendor/roboto/fonts/roboto-v18-latin-ext-regular.svg"],"./fonts/roboto-v18-latin-regular.eot":[["roboto-v18-latin-regular.d98f4fea.eot","../../vendor/roboto/fonts/roboto-v18-latin-regular.eot"],"../../vendor/roboto/fonts/roboto-v18-latin-regular.eot"],"./fonts/roboto-v18-latin-regular.woff2":[["roboto-v18-latin-regular.4006107d.woff2","../../vendor/roboto/fonts/roboto-v18-latin-regular.woff2"],"../../vendor/roboto/fonts/roboto-v18-latin-regular.woff2"],"./fonts/roboto-v18-latin-regular.woff":[["roboto-v18-latin-regular.bd8326cb.woff","../../vendor/roboto/fonts/roboto-v18-latin-regular.woff"],"../../vendor/roboto/fonts/roboto-v18-latin-regular.woff"],"./fonts/roboto-v18-latin-regular.ttf":[["roboto-v18-latin-regular.6a8eaf24.ttf","../../vendor/roboto/fonts/roboto-v18-latin-regular.ttf"],"../../vendor/roboto/fonts/roboto-v18-latin-regular.ttf"],"./fonts/roboto-v18-latin-regular.svg":[["roboto-v18-latin-regular.c0785ee4.svg","../../vendor/roboto/fonts/roboto-v18-latin-regular.svg"],"../../vendor/roboto/fonts/roboto-v18-latin-regular.svg"],"./fonts/roboto-mono-v5-cyrillic-ext-regular.eot":[["roboto-mono-v5-cyrillic-ext-regular.4952a7bf.eot","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.eot"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.eot"],"./fonts/roboto-mono-v5-cyrillic-ext-regular.woff2":[["roboto-mono-v5-cyrillic-ext-regular.a343c04c.woff2","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.woff2"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.woff2"],"./fonts/roboto-mono-v5-cyrillic-ext-regular.woff":[["roboto-mono-v5-cyrillic-ext-regular.02dad856.woff","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.woff"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.woff"],"./fonts/roboto-mono-v5-cyrillic-ext-regular.ttf":[["roboto-mono-v5-cyrillic-ext-regular.b5027def.ttf","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.ttf"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.ttf"],"./fonts/roboto-mono-v5-cyrillic-ext-regular.svg":[["roboto-mono-v5-cyrillic-ext-regular.fcc800a2.svg","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.svg"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-ext-regular.svg"],"./fonts/roboto-mono-v5-cyrillic-regular.eot":[["roboto-mono-v5-cyrillic-regular.db7200a5.eot","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.eot"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.eot"],"./fonts/roboto-mono-v5-cyrillic-regular.woff2":[["roboto-mono-v5-cyrillic-regular.a0775c2e.woff2","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.woff2"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.woff2"],"./fonts/roboto-mono-v5-cyrillic-regular.woff":[["roboto-mono-v5-cyrillic-regular.7f6eead1.woff","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.woff"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.woff"],"./fonts/roboto-mono-v5-cyrillic-regular.ttf":[["roboto-mono-v5-cyrillic-regular.e72639e2.ttf","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.ttf"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.ttf"],"./fonts/roboto-mono-v5-cyrillic-regular.svg":[["roboto-mono-v5-cyrillic-regular.e7761567.svg","../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.svg"],"../../vendor/roboto/fonts/roboto-mono-v5-cyrillic-regular.svg"],"./fonts/roboto-mono-v5-greek-ext-regular.eot":[["roboto-mono-v5-greek-ext-regular.df807e1a.eot","../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.eot"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.eot"],"./fonts/roboto-mono-v5-greek-ext-regular.woff2":[["roboto-mono-v5-greek-ext-regular.183435ee.woff2","../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.woff2"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.woff2"],"./fonts/roboto-mono-v5-greek-ext-regular.woff":[["roboto-mono-v5-greek-ext-regular.5368f1a7.woff","../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.woff"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.woff"],"./fonts/roboto-mono-v5-greek-ext-regular.ttf":[["roboto-mono-v5-greek-ext-regular.b36ddc8d.ttf","../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.ttf"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.ttf"],"./fonts/roboto-mono-v5-greek-ext-regular.svg":[["roboto-mono-v5-greek-ext-regular.fc4ec4d5.svg","../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.svg"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-ext-regular.svg"],"./fonts/roboto-mono-v5-greek-regular.eot":[["roboto-mono-v5-greek-regular.4949e00f.eot","../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.eot"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.eot"],"./fonts/roboto-mono-v5-greek-regular.woff2":[["roboto-mono-v5-greek-regular.e01d110c.woff2","../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.woff2"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.woff2"],"./fonts/roboto-mono-v5-greek-regular.woff":[["roboto-mono-v5-greek-regular.6ce0bc07.woff","../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.woff"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.woff"],"./fonts/roboto-mono-v5-greek-regular.ttf":[["roboto-mono-v5-greek-regular.dccc8fb6.ttf","../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.ttf"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.ttf"],"./fonts/roboto-mono-v5-greek-regular.svg":[["roboto-mono-v5-greek-regular.f09a520d.svg","../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.svg"],"../../vendor/roboto/fonts/roboto-mono-v5-greek-regular.svg"],"./fonts/roboto-mono-v5-vietnamese-regular.eot":[["roboto-mono-v5-vietnamese-regular.f52d96ca.eot","../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.eot"],"../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.eot"],"./fonts/roboto-mono-v5-vietnamese-regular.woff2":[["roboto-mono-v5-vietnamese-regular.90988442.woff2","../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.woff2"],"../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.woff2"],"./fonts/roboto-mono-v5-vietnamese-regular.woff":[["roboto-mono-v5-vietnamese-regular.8deea079.woff","../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.woff"],"../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.woff"],"./fonts/roboto-mono-v5-vietnamese-regular.ttf":[["roboto-mono-v5-vietnamese-regular.7a1db6a2.ttf","../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.ttf"],"../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.ttf"],"./fonts/roboto-mono-v5-vietnamese-regular.svg":[["roboto-mono-v5-vietnamese-regular.8d1b9a5e.svg","../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.svg"],"../../vendor/roboto/fonts/roboto-mono-v5-vietnamese-regular.svg"],"./fonts/roboto-mono-v5-latin-ext-regular.eot":[["roboto-mono-v5-latin-ext-regular.27ff21cd.eot","../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.eot"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.eot"],"./fonts/roboto-mono-v5-latin-ext-regular.woff2":[["roboto-mono-v5-latin-ext-regular.b8c4b3b3.woff2","../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.woff2"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.woff2"],"./fonts/roboto-mono-v5-latin-ext-regular.woff":[["roboto-mono-v5-latin-ext-regular.12d821e7.woff","../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.woff"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.woff"],"./fonts/roboto-mono-v5-latin-ext-regular.ttf":[["roboto-mono-v5-latin-ext-regular.f36f0401.ttf","../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.ttf"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.ttf"],"./fonts/roboto-mono-v5-latin-ext-regular.svg":[["roboto-mono-v5-latin-ext-regular.244d3b91.svg","../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.svg"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-ext-regular.svg"],"./fonts/roboto-mono-v5-latin-regular.eot":[["roboto-mono-v5-latin-regular.4e894717.eot","../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.eot"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.eot"],"./fonts/roboto-mono-v5-latin-regular.woff2":[["roboto-mono-v5-latin-regular.8ca14d31.woff2","../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.woff2"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.woff2"],"./fonts/roboto-mono-v5-latin-regular.woff":[["roboto-mono-v5-latin-regular.86eff8bc.woff","../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.woff"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.woff"],"./fonts/roboto-mono-v5-latin-regular.ttf":[["roboto-mono-v5-latin-regular.35407d2a.ttf","../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.ttf"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.ttf"],"./fonts/roboto-mono-v5-latin-regular.svg":[["roboto-mono-v5-latin-regular.e9cac80f.svg","../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.svg"],"../../vendor/roboto/fonts/roboto-mono-v5-latin-regular.svg"],"_css_loader":"../../node_modules/parcel/src/builtins/css-loader.js"}],"../../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36183" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/roboto.f546fe08.js.map