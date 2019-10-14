'use strict';
// Утилитарный модуль
(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var imgUploadForm = document.querySelector('.img-upload__form');
  var pictureList = document.querySelector('.pictures');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    imgUploadForm: imgUploadForm,
    pictureList: pictureList,

    getRandomNumber: function (max, min) {
      if (min === undefined) {
        min = 0;
      }
      return Math.floor((Math.random() * ((max + 1) - min)) + min);
    },

    getRandomArrElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    showErrorDataMessage: function (message) {
      var errorPopup = errorTemplate.cloneNode(true);
      errorPopup.querySelector('.error__title').textContent = message;
      errorPopup.querySelector('.error__buttons').innerHTML = '';
      main.appendChild(errorPopup);

      var closeErrorPopup = function () {
        main.removeChild(errorPopup);
        document.removeEventListener('keydown', onEscCloseError);
        document.removeEventListener('click', onClickCloseError);
      };

      var onEscCloseError = function (evt) {
        if (evt.keyCode === window.util.ESC_KEY) {
          closeErrorPopup();
        }
      };

      var onClickCloseError = function (evt) {
        if (evt.target === errorPopup) {
          closeErrorPopup();
        }
      };

      document.addEventListener('keydown', onEscCloseError);
      document.addEventListener('click', onClickCloseError);
    },
  };

})();
