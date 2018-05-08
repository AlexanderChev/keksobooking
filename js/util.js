'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

window.util = function () {

  /**
   * Коды клавиш
   * @enum {number}
   */
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32
  };

  /**
   * @type {function}
   */
  var timer;

  return {

    /**
     * @param {Event} evt
     * @param {function} callback
     */
    isEscEvent: function (evt, callback) {
      if (evt.keyCode === KeyCode.ESC) {
        callback();
      }
    },

    /**
     * @param {Event} evt
     * @param {function} callback
     */
    isEnterOrSpaceEvent: function (evt, callback) {
      if (evt.keyCode === KeyCode.ENTER || evt.keyCode === KeyCode.SPACE) {
        callback();
      }
    },

    /**
     * @param {Element} container
     */
    removeElements: function (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    /**
     * Выводит сообщение об ошибке
     * @param {string} errorText
     */
    onError: function (errorText) {
      var node = document.createElement('div');
      node.className = 'error';
      node.textContent = errorText;
      document.body.appendChild(node);

      setTimeout(function () {
        document.body.removeChild(node);
      }, 3000);
    },

    /**
     * Функция тротлинга
     * @param {function} callback
     * @param {number} duration
     */
    debounce: function (callback, duration) {
      duration = duration || 500;

      clearTimeout(timer);
      timer = setTimeout(function () {
        callback();
      }, duration);
    }
  };
}();
