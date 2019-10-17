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

  var onClickSubmitButton = function () {
    // window.hashtag.setHashCustomValidity(hashtagInput);
  };


  hashtagInput.addEventListener('focus', function () {
    hashtagInput.reportValidity();
  });

  hashtagInput.addEventListener('input', function () {
    // submitButton.disabled = true;
    var lastTimeout;
    lastTimeout = setTimeout(function () {
      window.hashtag.setHashCustomValidity(hashtagInput);
      // hashtagInput.reportValidity();
      // hashtagInput.style.outline = '2px solid red';
      // hashtagInput.style.boxShadow = 'inset 0 0 0 1px rgba(245, 12, 12, 0.9)';
      hashtagInput.style.border = '2px solid red';
    }, 1000);
  });

  var closeEdit = function () {
    window.util.imgUploadForm.reset();
    imgEditOverlay.classList.add('hidden');
    closeEditButton.removeEventListener('click', closeEdit);
    document.removeEventListener('keydown', onEscButtomCloseEdit);
    window.edit.effectLevelPin.removeEventListener('mousedown', window.slider.onPinMouseDown);
    imgEffectsList.removeEventListener('change', onClickEffectPreview);
    submitButton.removeEventListener('click', onClickSubmitButton);
    pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
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
  };


})();
