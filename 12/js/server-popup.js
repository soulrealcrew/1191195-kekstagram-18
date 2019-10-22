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

      if (buttons) {
        var buttonsTemplate = popupTemplate.querySelectorAll('button');
        buttonsTemplate.forEach(function (button) {
          button.addEventListener('click', onButtonClick);
        });
        window.edit.imgEditOverlay.classList.add('hidden');
      } else {
        popupTemplate.querySelector('button').parentElement.innerHTML = '';
      }

      window.util.addEscClose(document, closePopup);
      window.util.addOutClickEvent(document, closePopup, popupTemplate);
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
