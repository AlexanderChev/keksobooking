'use strict';

window.backend = function () {
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  // var LOAD_URL = 'data/data.json';

  /**
   * Коды состояния HTTP
   * @enum {number}
   */
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  /**
   * @const
   * @type {number}
   */
  var TIMEOUT = 7000;

  return {

    /**
     * Загружает данные с сервера
     * @param {function} onLoad
     * @param {function} onError
     */
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case StatusCode.OK:
            onLoad(xhr.response);
            break;
          case StatusCode.BAD_REQUEST:
            errorText = 'Неверный запрос';
            break;
          case StatusCode.NOT_FOUND:
            errorText = 'Данные не найдены';
            break;
          case StatusCode.SERVER_ERROR:
            errorText = 'Ошибка сервера';
            break;
          default:
            errorText = 'Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText;
        }

        if (errorText) {
          onError(errorText);
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

    /**
     * Отправляет данные формы на сервер
     * @param {Object} data
     * @param {function} onLoad
     * @param {function} onError
     */
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
