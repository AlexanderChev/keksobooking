'use strict';

window.util = function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, callback) {
      if (evt.keyCode === ESC_KEYCODE) {
        callback();
      }
    },

    isEnterEvent: function (evt, callback) {
      if (evt.keyCode === ENTER_KEYCODE) {
        callback();
      }
    },

    removeElements: function (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
  };
}();
