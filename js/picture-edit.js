'use strict';
// Модуль работы с окном редактирования изображения
(function () {
  window.edit = {
    imgPreview: window.util.imgUploadForm.querySelector('.img-upload__preview').children[0],
    effectLevelValue: window.util.imgUploadForm.querySelector('.effect-level__value'),
    effectLevelPin: window.util.imgUploadForm.querySelector('.effect-level__pin'),
    effectLevelCompleteLine: window.util.imgUploadForm.querySelector('.effect-level__depth'),
    DEFFAULT_PIN_POSITION: 91,
    DEFFAULT_VALUE: 20,

  };

  var imgEditOverlay = window.util.imgUploadForm.querySelector('.img-upload__overlay');
  var submitButton = window.util.imgUploadForm.querySelector('.img-upload__submit');
  var closeEditButton = window.util.imgUploadForm.querySelector('#upload-cancel');
  var imgEffectsList = window.util.imgUploadForm.querySelector('.effects__list');
  var hashtagInput = window.util.imgUploadForm.querySelector('.text__hashtags');
  var commentInput = window.util.imgUploadForm.querySelector('.text__description');

  var onEscButtomCloseEdit = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY && evt.target !== hashtagInput && evt.target !== commentInput) {
      closeEdit();
    }
  };

  var onClickEffectPreview = function () {
    window.effect.changePreviewEffect();
  };

  var onClickSubmitButton = function () {
    window.hashtag.setHashCustomValidity(hashtagInput);
  };

  var closeEdit = function () {
    window.util.imgUploadForm.reset();
    imgEditOverlay.classList.add('hidden');
    closeEditButton.removeEventListener('click', closeEdit);
    document.removeEventListener('keydown', onEscButtomCloseEdit);
    window.edit.effectLevelPin.removeEventListener('mousedown', window.slider.onPinMouseDown);
    imgEffectsList.removeEventListener('change', onClickEffectPreview);
    submitButton.removeEventListener('click', onClickSubmitButton);
    window.util.pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
    window.effect.resetEffect();
  };

  window.edit.openEdit = function () {
    imgEditOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', closeEdit);
    document.addEventListener('keydown', onEscButtomCloseEdit);
    window.edit.effectLevelPin.addEventListener('mousedown', window.slider.onPinMouseDown);
    imgEffectsList.addEventListener('change', onClickEffectPreview);
    submitButton.addEventListener('click', onClickSubmitButton);
    window.util.pictureList.removeEventListener('keydown', window.fullsize.onEnterPreviewPicture);
  };

})();
