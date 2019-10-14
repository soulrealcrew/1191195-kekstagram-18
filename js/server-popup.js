'use strict';
// Модуль валидации хэштега
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var showErrorDataMessage = function (message) {
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
  };

  window.popup = {
    showErrorDataMessage: showErrorDataMessage,
  };

})();
