'use strict';
// Утилитарный модуль
(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var DEBOUNCE_INTERVAL = 1000; // ms

  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getRandomNumber = function (max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
  };

  var getRandomArrElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    debounce: debounce,
    getRandomNumber: getRandomNumber,
    getRandomArrElement: getRandomArrElement,
  };
})();
