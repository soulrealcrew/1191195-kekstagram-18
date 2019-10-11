'use strict';
// Модуль логики работы слайдера
(function () {


  var getPinPercentPos = function (position, maxValue) {
    return position / maxValue * 100;
  };
  // Логика работы с пином и изменением эффекта при движении пина
  window.slider = {
    onPinMouseDown: function (evt) {
      evt.preventDefault();
      var currentEffect = window.effect.getCheckedEffectData();
      var startCoord = evt.ClientX;
      var pin = evt.target;
      var line = evt.target.offsetParent;
      var maxValue = line.offsetWidth;

      var onPinMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = startCoord - moveEvt.clientX;
        startCoord = moveEvt.clientX;

        if (pin.offsetLeft - shift < 0) {
          pin.style.left = 0;
          document.removeEventListener('mousemove', onPinMouseMove);
          document.removeEventListener('mouseup', onPinMouseUp);
        } else if (pin.offsetLeft - shift > maxValue) {
          pin.style.left = maxValue + 'px';
          document.removeEventListener('mousemove', onPinMouseMove);
          document.removeEventListener('mouseup', onPinMouseUp);
        } else {
          pin.style.left = (pin.offsetLeft - shift) + 'px';
          window.edit.effectLevelCompleteLine.style.width = pin.offsetLeft + 'px';
        }

        window.edit.effectLevelValue.value = getPinPercentPos(pin.offsetLeft, maxValue);
        window.effect.setEffect(window.edit.effectLevelValue.value, currentEffect, window.edit.imgPreview);
      };

      var onPinMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onPinMouseMove);
        document.removeEventListener('mouseup', onPinMouseUp);
      };

      document.addEventListener('mousemove', onPinMouseMove);
      document.addEventListener('mouseup', onPinMouseUp);
    },

  };

})();
