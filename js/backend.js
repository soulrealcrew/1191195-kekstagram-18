'use strict';

(function () {
  var LOAD_TIMEOUT = 10000; // 10s
  var SUCCESS_STATUS = 200;

  window.backend = {
    download: function (onSuccess, onError) {
      var url = 'https://js.dump.academy/kekstagram/data';
      var action = 'GET';
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

      xhr.open(action, url);
      xhr.send();
    },
  };

})();
