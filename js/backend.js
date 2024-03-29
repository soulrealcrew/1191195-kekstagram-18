'use strict';

(function () {
  var LOAD_TIMEOUT = 10000; // 10s
  var SUCCESS_STATUS = 200;

  var BASE_URL = 'https://js.dump.academy/kekstagram';
  var urls = {
    DATA: BASE_URL + '/data',
  };

  var createXhr = function (onSuccess, onError) {
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

    return xhr;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('POST', BASE_URL);
    xhr.send(data);
  };

  var download = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('GET', urls.DATA);
    xhr.send();
  };

  window.backend = {
    download: download,
    upload: upload,
  };

})();
