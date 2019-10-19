'use strict';
// Модуль всплывающих окон результата работы с сервером
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var getPopup = function (template, buttons) {
    return function (message) {
      var popupTemplate = template.cloneNode(true);
      if (message) {
        popupTemplate.querySelector('.error__title').textContent = message;
      }

      var closePopup = function () {
        main.removeChild(popupTemplate);
        document.removeEventListener('keydown', onEscClosePopup);
        document.removeEventListener('click', onClickClosePopup);
      };

      var onButtonClick = function (evt) {
        switch (evt.target.id) {
          case 'retry-button':
            window.edit.imgEditOverlay.classList.remove('hidden');
            break;
          case 'close-button':
            window.edit.closeEdit();
            break;
        }
        buttonsTemplate.forEach(function (button) {
          button.removeEventListener('click', onButtonClick);
        });
        closePopup();
      };

      var onEscClosePopup = function (evt) {
        if (evt.keyCode === window.util.ESC_KEY) {
          closePopup();
        }
      };

      var onClickClosePopup = function (evt) {
        if (evt.target === popupTemplate) {
          closePopup();
        }
      };

      if (buttons) {
        var buttonsTemplate = popupTemplate.querySelectorAll('button');
        buttonsTemplate.forEach(function (button) {
          button.addEventListener('click', onButtonClick);
        });
        window.edit.imgEditOverlay.classList.add('hidden');
      } else {
        popupTemplate.querySelector('button').parentElement.innerHTML = '';
      }

      document.addEventListener('keydown', onEscClosePopup);
      document.addEventListener('click', onClickClosePopup);
      main.appendChild(popupTemplate);
    };
  };

  var showErrorDataMessage = getPopup(errorTemplate, false);
  var showSuccessUploadMessage = getPopup(successTemplate, true);
  var showErrorUploadMessage = getPopup(errorTemplate, true);

  window.popup = {
    showErrorDataMessage: showErrorDataMessage,
    showSuccessUploadMessage: showSuccessUploadMessage,
    showErrorUploadMessage: showErrorUploadMessage,
  };

})();
