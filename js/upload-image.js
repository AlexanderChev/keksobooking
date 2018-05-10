'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

/**
 *
 * @param {Element} field
 * @param {function(string)} callback
 */
window.uploadImage = function (field, callback) {
  /**
   * Доступные форматы изображений
   * @type {Array.<string>}
   */
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  field.addEventListener('change', function () {
    var file = field.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });
};

