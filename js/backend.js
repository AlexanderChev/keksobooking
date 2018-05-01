'use strict';

window.backend = function () {
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = 'data/data.json';
  var TIMEOUT = 7000;

  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        xhr.abort();
        onError('Время запроса вышло');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        xhr.abort();
        onError('Время запроса вышло');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    }
  };
}();
