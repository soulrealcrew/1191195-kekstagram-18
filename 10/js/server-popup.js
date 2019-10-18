'use strict';
// Модуль всплывающих окон результата работы с сервером
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
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

  var showSuccessUploadMessage = function () {
    var succsessPopup = successTemplate.cloneNode(true);
    var successButton = succsessPopup.querySelector('.success__button');

    var closeSuccessPopup = function () {
      successButton.removeEventListener('click', onClickSuccessButton);
      document.removeEventListener('keydown', onEscCloseSuccess);
      document.removeEventListener('click', onClickOutPopop);
      main.removeChild(succsessPopup);
    };

    var onClickSuccessButton = function () {
      closeSuccessPopup();
    };

    var onEscCloseSuccess = function (evt) {
      if (evt.keyCode === window.util.ESC_KEY) {
        closeSuccessPopup();
      }
    };

    var onClickOutPopop = function (evt) {
      if (evt.target === succsessPopup) {
        closeSuccessPopup();
      }
    };

    successButton.addEventListener('click', onClickSuccessButton);
    document.addEventListener('keydown', onEscCloseSuccess);
    document.addEventListener('click', onClickOutPopop);

    main.appendChild(succsessPopup);

  };

  var showErrorUploadMessage = function (message) {
    var errorPopup = errorTemplate.cloneNode(true);
    var errorPopupButtons = errorPopup.querySelectorAll('.error__button');
    var retryButton = errorPopupButtons[0];
    var uploadAnotherFileButton = errorPopupButtons[1];


    var closeErrorPopup = function () {
      window.edit.imgEditOverlay.classList.remove('hidden');
      retryButton.removeEventListener('click', onRetryButtonClick);
      uploadAnotherFileButton.removeEventListener('click', onUploadAnotherButtonClick);
      main.removeChild(errorPopup);
    };

    var onRetryButtonClick = function () {
      closeErrorPopup();
      retryButton.removeEventListener('click', onRetryButtonClick);
    };

    var onUploadAnotherButtonClick = function () {
      closeErrorPopup();
      window.edit.closeEdit();
    };

    var onEscCloseError = function (evt) {
      if (evt.keyCode === window.util.ESC_KEY) {
        closeErrorPopup();
        window.edit.closeEdit();
      }
    };

    var onClickCloseError = function (evt) {
      if (evt.target === errorPopup) {
        closeErrorPopup();
        window.edit.closeEdit();
      }
    };

    errorPopup.querySelector('.error__title').textContent = message;

    retryButton.addEventListener('click', onRetryButtonClick);
    document.addEventListener('keydown', onEscCloseError);
    document.addEventListener('click', onClickCloseError);
    uploadAnotherFileButton.addEventListener('click', onUploadAnotherButtonClick);
    window.edit.imgEditOverlay.classList.add('hidden');
    main.appendChild(errorPopup);
  };

  window.popup = {
    showErrorDataMessage: showErrorDataMessage,
    showSuccessUploadMessage: showSuccessUploadMessage,
    showErrorUploadMessage: showErrorUploadMessage,
  };

})();
