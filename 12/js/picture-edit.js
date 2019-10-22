'use strict';
// Модуль работы с окном редактирования изображения
(function () {
  var INVALID_COLOR = 'red';
  var DEFFAULT_PIN_POSITION = 91;
  var DEFFAULT_VALUE = 20;

  var pictureList = document.querySelector('.pictures');
  var uploadPopup = document.querySelector('.img-upload__form');
  var imgEditOverlay = uploadPopup.querySelector('.img-upload__overlay');
  var submitButton = uploadPopup.querySelector('.img-upload__submit');
  var closeEditButton = uploadPopup.querySelector('#upload-cancel');
  var imgEffectsList = uploadPopup.querySelector('.effects__list');
  var hashtagInput = uploadPopup.querySelector('.text__hashtags');
  var commentInput = uploadPopup.querySelector('.text__description');
  var imgPreview = uploadPopup.querySelector('.img-upload__preview').children[0];
  var effectLevelValue = uploadPopup.querySelector('.effect-level__value');
  var effectLevelPin = uploadPopup.querySelector('.effect-level__pin');
  var effectLevelCompleteLine = uploadPopup.querySelector('.effect-level__depth');


  var uploadPictureSuccess = function () {
    window.edit.closeEdit();
    window.popup.showSuccessUploadMessage();
  };

  var uploadPictureError = function (message) {
    window.popup.showErrorUploadMessage(message);
  };

  var onEscButtomCloseEdit = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY && evt.target !== hashtagInput && evt.target !== commentInput) {
      closeEdit();
    }
  };

  var onClickEffectPreview = function () {
    window.effect.changePreviewEffect();
  };

  var checkInputValidity = function () {
    if (hashtagInput.validity.valid) {
      window.backend.upload(new FormData(uploadPopup), uploadPictureSuccess, uploadPictureError);
    } else {
      hashtagInput.reportValidity();
    }
  };

  var onClickSubmitButton = function (evt) {
    checkInputValidity();
    evt.preventDefault();
  };

  var hashtagInputValidation = window.util.debounce(function () {
    window.hashtag.setHashCustomValidity(hashtagInput);
    hashtagInput.reportValidity();
    submitButton.disabled = false;
    if (hashtagInput.validity.valid) {
      hashtagInput.style.borderColor = '';
    } else {
      hashtagInput.style.borderColor = INVALID_COLOR;
    }
  });

  var onInputChange = function () {
    submitButton.disabled = true;
    hashtagInputValidation();
  };

  var formReset = function () {
    uploadPopup.reset();
    window.effect.resetEffect();
    window.scale.resetScale();
  };

  var closeEdit = function () {
    formReset();
    imgEditOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscButtomCloseEdit);
    window.edit.effectLevelPin.removeEventListener('mousedown', window.slider.onPinMouseDown);
    imgEffectsList.removeEventListener('change', onClickEffectPreview);
    submitButton.removeEventListener('click', onClickSubmitButton);
    pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
    pictureList.addEventListener('click', window.fullsize.onClickPreviewPicture);
    hashtagInput.removeEventListener('input', onInputChange);
    window.scale.scaleForm.removeEventListener('click', window.scale.onScaleButtonClick);
  };

  var openEdit = function () {
    imgEditOverlay.classList.remove('hidden');
    window.util.addClickEvent(closeEditButton, closeEdit);
    document.addEventListener('keydown', onEscButtomCloseEdit);
    window.edit.effectLevelPin.addEventListener('mousedown', window.slider.onPinMouseDown);
    imgEffectsList.addEventListener('change', onClickEffectPreview);
    submitButton.addEventListener('click', onClickSubmitButton);
    pictureList.removeEventListener('keydown', window.fullsize.onEnterPreviewPicture);
    pictureList.removeEventListener('click', window.fullsize.onClickPreviewPicture);
    hashtagInput.addEventListener('input', onInputChange);
    window.scale.scaleForm.addEventListener('click', window.scale.onScaleButtonClick);
  };

  window.edit = {
    DEFFAULT_PIN_POSITION: DEFFAULT_PIN_POSITION,
    DEFFAULT_VALUE: DEFFAULT_VALUE,
    imgPreview: imgPreview,
    effectLevelValue: effectLevelValue,
    effectLevelPin: effectLevelPin,
    effectLevelCompleteLine: effectLevelCompleteLine,
    imgEditOverlay: imgEditOverlay,
    closeEdit: closeEdit,
    openEdit: openEdit,
  };

})();
