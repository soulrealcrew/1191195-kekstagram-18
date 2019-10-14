'use strict';
// Утилитарный модуль
(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,

    getRandomNumber: function (max, min) {
      if (min === undefined) {
        min = 0;
      }
      return Math.floor((Math.random() * ((max + 1) - min)) + min);
    },

    getRandomArrElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
  };
})();
