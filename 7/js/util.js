'use strict';
// Утилитарный модуль
(function () {


  window.util = {
    imgUploadForm: document.querySelector('.img-upload__form'),
    pictureList: document.querySelector('.pictures'),
    ESC_KEY: 27,
    ENTER_KEY: 13,

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
