'use strict';
// Модуль работы с эффектом
(function () {
  var imgEffectsList = window.util.imgUploadForm.querySelector('.effects__list');
  var effectLevel = window.util.imgUploadForm.querySelector('.effect-level');
  var effectLevelValue = window.util.imgUploadForm.querySelector('.effect-level__value');

  // Функция которая возрвашает процентное соотношение в заданном диапазоне, необходимом для эффекта
  var getEffectLevel = function (percent, min, max) {
    return (((max - min) / 100 * percent) + min);
  };

  // Функция получения строки эффекта
  var getEffect = function (percent, effect) {
    if (effect.name === '') {
      return 'none';
    }
    var value = getEffectLevel(percent, effect.minRange, effect.maxRange);
    return effect.name + '(' + value + effect.measures + ')';
  };

  window.effect = {

    getCheckedEffectData: function () {
      var checkedEffect = imgEffectsList.querySelector('input[name="effect"]:checked').value;

      var effectsMap = {
        'none': {
          'name': '',
          'measures': '',
          'minRange': '',
          'maxRange': '',
        },
        'chrome': {
          'name': 'grayscale',
          'measures': '',
          'minRange': 0,
          'maxRange': 1,
          'class': 'effects__preview--chrome',
        },
        'sepia': {
          'name': 'sepia',
          'measures': '',
          'minRange': 0,
          'maxRange': 1,
          'class': 'effects__preview--sepia',
        },
        'marvin': {
          'name': 'invert',
          'measures': '%',
          'minRange': 0,
          'maxRange': 100,
          'class': 'effects__preview--marvin',
        },
        'phobos': {
          'name': 'blur',
          'measures': 'px',
          'minRange': 0,
          'maxRange': 5,
          'class': 'effects__preview--phobos',
        },
        'heat': {
          'name': 'brightness',
          'measures': '',
          'minRange': 1,
          'maxRange': 3,
          'class': 'effects__preview--heat',
        },
      };
      return effectsMap[checkedEffect];
    },

    setEffect: function (percent, effectData, img) {
      img.style.filter = getEffect(percent, effectData);
    },

    getEffectLevelValue: function () {
      return effectLevel.querySelector('.effect-level__value').value;
    },

    changePreviewEffect: function () {
      var currentEffect = window.effect.getCheckedEffectData();
      window.effect.resetEffect();
      window.edit.imgPreview.className = currentEffect.class;
      window.effect.setEffect(window.effect.getEffectLevelValue(), currentEffect, window.edit.imgPreview);
    },

    // Сброс эффектов
    resetEffect: function () {
      effectLevelValue.value = window.edit.DEFFAULT_VALUE;
      window.edit.effectLevelPin.style.left = window.edit.DEFFAULT_PIN_POSITION + 'px';
      window.edit.effectLevelCompleteLine.style.width = window.edit.DEFFAULT_PIN_POSITION + 'px';
      window.effect.setEffect(window.edit.DEFFAULT_VALUE, window.effect.getCheckedEffectData(), window.edit.imgPreview);
    },


  };

})();
