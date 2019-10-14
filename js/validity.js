'use strict';
// Модуль валидации хэштега
(function () {

  var HashTag = {
    MAX_LENGTH: 20,
    MAX_COUNT: 5,
    SYMBOL: '#',
  };

  var isHashTooLong = function (hash) {
    return hash.length > HashTag.MAX_LENGTH;
  };

  var isHashHasSpace = function (hash) {
    return (hash.indexOf(HashTag.SYMBOL, 1) !== -1);
  };

  var isHashHasTag = function (hash) {
    return hash[0] !== HashTag.SYMBOL;
  };


  var isHashRepeat = function (currentHash, hashIndex, array) {
    return (array.indexOf(currentHash, hashIndex + 1) !== -1);
  };

  var isHashEmpty = function (hash) {
    return (hash.length === 1 && hash[0] === HashTag.SYMBOL);
  };

  var isTooMuchHash = function (array) {
    return array.length > HashTag.MAX_COUNT;
  };

  var checkHashValidity = function (input) {
    var validity = {
      'hashToLong': false,
      'hashHasSpace': false,
      'hashHasTag': false,
      'tooMushHashs': false,
      'hashIsRepeat': false,
      'hashIsEmpty': false,
    };

    var hashs = input.value.split(' ');

    if (isTooMuchHash(hashs)) {
      validity.tooMushHashs = true;
    }

    for (var hashIndex = 0; hashIndex < hashs.length; hashIndex++) {
      var currentHash = hashs[hashIndex];
      if (isHashTooLong(currentHash)) {
        validity.hashToLong = true;
      }
      if (isHashHasSpace(currentHash)) {
        validity.hashHasSpace = true;
      }

      if (isHashHasTag(currentHash)) {
        validity.hashHasTag = true;
      }

      if (isHashRepeat(currentHash, hashIndex, hashs)) {
        validity.hashIsRepeat = true;
      }
      if (isHashEmpty(currentHash)) {
        validity.hashIsEmpty = true;
      }
    }

    return validity;
  };
  window.hashtag = {
    setHashCustomValidity: function (input) {
      input.setCustomValidity('');

      var localesMap = {
        'hashToLong': 'Длинна одного хэштега не должна превышать 20 символов',
        'hashHasSpace': 'Вы забыли пробел между хэштегами',
        'hashHasTag': 'Используйте символ "#" для указания хэштега',
        'tooMushHashs': 'Максимальное допустимое количество хэштегов не должно превышать 5-ти',
        'hashIsRepeat': 'Нельзя использовать два одинаковых хэштега',
        'hashIsEmpty': 'У хэштега должно быть название',
      };

      if (input.value !== '') {
        var validity = checkHashValidity(input);

        for (var key in validity) {
          if (validity[key] && localesMap[key]) {
            input.setCustomValidity(localesMap[key]);
          }
        }
      }
    },
  };

})();
