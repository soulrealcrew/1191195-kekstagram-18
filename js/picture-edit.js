'use strict';
// Модуль работы с окном редактирования изображения
(function () {
  var pictureList = document.querySelector('.pictures');
  var uploadPopup = document.querySelector('.img-upload__form');
  var imgEditOverlay = uploadPopup.querySelector('.img-upload__overlay');
  var submitButton = uploadPopup.querySelector('.img-upload__submit');
  var closeEditButton = uploadPopup.querySelector('#upload-cancel');
  var imgEffectsList = uploadPopup.querySelector('.effects__list');
  var hashtagInput = uploadPopup.querySelector('.text__hashtags');
  var commentInput = uploadPopup.querySelector('.text__description');

  window.edit = {
    imgPreview: uploadPopup.querySelector('.img-upload__preview').children[0],
    effectLevelValue: uploadPopup.querySelector('.effect-level__value'),
    effectLevelPin: uploadPopup.querySelector('.effect-level__pin'),
    effectLevelCompleteLine: uploadPopup.querySelector('.effect-level__depth'),
    DEFFAULT_PIN_POSITION: 91,
    DEFFAULT_VALUE: 20,

  };

  var onEscButtomCloseEdit = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY && evt.target !== hashtagInput && evt.target !== commentInput) {
      closeEdit();
    }
  };

  var onClickEffectPreview = function () {
    window.effect.changePreviewEffect();
  };

  var onClickSubmitButton = function (evt) {
    evt.preventDefault();
  };

  var hashtagInputValidation = window.util.debounce(function () {
    window.hashtag.setHashCustomValidity(hashtagInput);
    hashtagInput.reportValidity();
    if (hashtagInput.validity.valid) {
      hashtagInput.style.borderColor = '';
      submitButton.disabled = false;
    } else {
      hashtagInput.style.borderColor = 'red';
    }
  });

  var onInputChange = function () {
    submitButton.disabled = true;
    hashtagInputValidation();
  };

  var closeEdit = function () {
    window.util.imgUploadForm.reset();
    imgEditOverlay.classList.add('hidden');
    closeEditButton.removeEventListener('click', closeEdit);
    document.removeEventListener('keydown', onEscButtomCloseEdit);
    window.edit.effectLevelPin.removeEventListener('mousedown', window.slider.onPinMouseDown);
    imgEffectsList.removeEventListener('change', onClickEffectPreview);
    submitButton.removeEventListener('click', onClickSubmitButton);
    pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
    pictureList.addEventListener('click', window.fullsize.onClickPreviewPicture);
    pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
    hashtagInput.removeEventListener('input', onInputChange);
    window.effect.resetEffect();
  };

  window.edit.openEdit = function () {
    imgEditOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', closeEdit);
    document.addEventListener('keydown', onEscButtomCloseEdit);
    window.edit.effectLevelPin.addEventListener('mousedown', window.slider.onPinMouseDown);
    imgEffectsList.addEventListener('change', onClickEffectPreview);
    submitButton.addEventListener('click', onClickSubmitButton);
    pictureList.removeEventListener('keydown', window.fullsize.onEnterPreviewPicture);
    pictureList.removeEventListener('click', window.fullsize.onClickPreviewPicture);
    pictureList.removeEventListener('keydown', window.fullsize.onEnterPreviewPicture);
    hashtagInput.addEventListener('input', onInputChange);
  };


})();
