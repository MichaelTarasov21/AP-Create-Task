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
})({"scripts/intergercheck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckIfIntInput = CheckIfIntInput;

function CheckIfIntInput(UserInput) {
  var IntofInput = parseInt(UserInput);

  if (UserInput != IntofInput) {
    return false;
  } else {
    return true;
  }
}
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _intergercheck = require("./intergercheck");

var Domselectors = {
  body: document.body
};

function loadsettings() {
  var guesslimit;
  Domselectors.body.innerHTML = "<div class=\"page\"><h1>Guess the Number</h1><div id=\"intro_form\"><p>Out of how much would you like to guess?</p><input class=\"num_input\" id=\"maxnumber\" type=\"number\" min=\"2\"><br><input type=\"checkbox\" id=\"Limitoption\"><label>Limit number of guesses</label><div id=guesslimitbox></div><br><input type=\"submit\" value=\"Start the game\" id=\"start_button\"></div></div>";
  document.getElementById("Limitoption").addEventListener("click", function () {
    if (document.getElementById("Limitoption").checked) {
      guesslimit = true;
      document.getElementById("guesslimitbox").innerHTML = "<br>How many guesses do you want?<br><input class=\"num_input\" id=\"guessamount\" type=\"number\" min=\"1\">";
    } else {
      guesslimit = false;
      document.getElementById("guesslimitbox").innerHTML = "";
    }
  });
  document.getElementById("start_button").addEventListener("click", function () {
    var maxnumber = document.getElementById("maxnumber").value;

    if (!(0, _intergercheck.CheckIfIntInput)(maxnumber) || maxnumber <= 1) {
      alert("Please enter a whole number greater than 1 for the highest number you want to play");
      return;
    }

    if (guesslimit) {
      var guessamount = document.getElementById("guessamount").value;

      if (!(0, _intergercheck.CheckIfIntInput)(guessamount) || guessamount <= 0) {
        alert("Please enter a whole number greater than 0 for the maximum amount of guesses");
        return;
      }

      startgame(maxnumber, guessamount);
      return;
    }

    startgame(maxnumber);
  });
}

function startgame(maxnumber) {
  var guessamount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var numbertoguess = Math.floor(Math.random() * maxnumber) + 1;
  console.log(numbertoguess);
  var guesses = [];
  var guesslimit = false;
  Domselectors.body.innerHTML = "<div class=\"page\"><h2>I am thinking of a number between 1 and ".concat(maxnumber, "</h2><br><br><h3>Your Guess:</h3><input class=\"num_input\" id=\"guess\" type=\"number\"><br><input type=\"submit\" value=\"Guess\" id=\"submitguess\"><br><div id=\"tips\"></div>");

  if (guessamount !== 0) {
    guesslimit = true;
    document.getElementById("tips").insertAdjacentHTML("afterend", "<br></div><div id=\"guessesleft\">Guess ".concat(guesses.length + 1, " of ").concat(guessamount, "</div>"));
  }

  document.getElementById("submitguess").addEventListener("click", function () {
    var guess = document.getElementById("guess").value;

    if ((0, _intergercheck.CheckIfIntInput)(guess)) {
      guesses.push(guess);

      if (guess == numbertoguess) {
        document.body.innerHTML = "<div class=\"page\"><h1>You Won</h1><br><h2>I was thinking of ".concat(numbertoguess, "</h2><br><div id=\"Guesses\"></div></div>");
        guesses.forEach(function (item, index) {
          if (item < numbertoguess) {
            document.getElementById("Guesses").insertAdjacentHTML("beforeend", "<br>".concat(index + 1, ": You guessed ").concat(item, " and I told you that it was less than the number you had to guess<br>"));
          } else if (item > numbertoguess) {
            document.getElementById("Guesses").insertAdjacentHTML("beforeend", "<br>".concat(index + 1, ": You guessed ").concat(item, " and I told you that it was greater than the number you had to guess<br>"));
          } else {
            document.getElementById("Guesses").insertAdjacentHTML("beforeend", "<br>".concat(index + 1, ": You guessed ").concat(item, " and I told you that you won<br>"));
          }
        });
        return;
      } else if (guess > numbertoguess) {
        document.getElementById("tips").innerHTML = "<h1>".concat(guess, " is greater than the number I am thinking of</h1>");
      } else {
        document.getElementById("tips").innerHTML = "<h1>".concat(guess, " is less than the number I am thinking of</h1>");
      }

      if (guesslimit) {
        document.getElementById("guessesleft").innerHTML = "</div><div id=\"guessesleft\">Guess ".concat(guesses.length + 1, " of ").concat(guessamount, "</div>");

        if (guesses.length == guessamount) {
          document.body.innerHTML = "<div class=\"page\"><h1>You Lost</h1><br><h2>I was thinking of ".concat(numbertoguess, "</h2><br><div id=\"Guesses\"></div></div>");
          guesses.forEach(function (item, index) {
            if (item < numbertoguess) {
              document.getElementById("Guesses").insertAdjacentHTML("beforeend", "<br>".concat(index + 1, ": You guessed ").concat(item, " and I told you that it was less than the number you had to guess<br>"));
            } else {
              document.getElementById("Guesses").insertAdjacentHTML("beforeend", "<br>".concat(index + 1, ": You guessed ").concat(item, " and I told you that it was greater than the number you had to guess<br>"));
            }
          });
          document.getElementById("Guesses").insertAdjacentHTML("beforeend", "<br>And then you ran out of guesses");
          return;
        }
      }
    } else {
      alert("Please guess a whole number");
    }
  });
}

loadsettings();
},{"./intergercheck":"scripts/intergercheck.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52307" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map