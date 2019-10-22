'use strict';
// Модуль изменения масштаба изображения
(function () {

  var scaleForm = document.querySelector('.img-upload__scale');
  var scaleInput = scaleForm.querySelector('.scale__control--value');
  var scaleIncreaseButton = scaleForm.querySelector('.scale__control--bigger');
  var scaleDecreaseButton = scaleForm.querySelector('.scale__control--smaller');

  var ScaleValue = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100,
  };

  var changeScaleValue = function (operator) {
    var expectedScale = parseInt(scaleInput.value, 10) + (ScaleValue.STEP * operator);
    if (expectedScale <= ScaleValue.MAX && expectedScale >= ScaleValue.MIN) {
      scaleInput.value = expectedScale + '%';
      window.edit.imgPreview.style.transform = 'scale(' + expectedScale / 100 + ')';
    }
  };


  var onScaleButtonClick = function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      switch (evt.target) {
        case scaleIncreaseButton:
          changeScaleValue(1);
          break;
        case scaleDecreaseButton:
          changeScaleValue(-1);
          break;
      }
    }
  };

  var resetScale = function () {
    window.edit.imgPreview.style.transform = 'scale(' + ScaleValue.DEFAULT / 100 + ')';
  };

  window.scale = {
    onScaleButtonClick: onScaleButtonClick,
    resetScale: resetScale,
    scaleForm: scaleForm,
  };

})();
