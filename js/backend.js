'use strict';

(function () {
  var LOAD_TIMEOUT = 10000; // 10s
  var SUCCESS_STATUS = 200;

  var Request = {
    'download': {
      URL: 'https://js.dump.academy/kekstagram/data',
      ACTION: 'GET',
    },
    'upload': {
      URL: 'https://js.dump.academy/kekstagram',
      ACTION: 'POST',
    }
  };

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = LOAD_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(Request['download'].ACTION, Request['download'].URL);
    xhr.send();
  };

  window.backend = {
    download: download,
  };

})();
