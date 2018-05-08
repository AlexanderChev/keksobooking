'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

/**
 * Синхронизирует поля формы
 * @param {Element} firstField
 * @param {Element} secondField
 * @param {Array.<string>} firstFieldValues
 * @param {Array.<string>} secondFieldValues
 * @param {function(Element, string)} callback
 */
window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, callback) {
  var onFieldInput = function () {
    var index = firstFieldValues.indexOf(firstField.value);
    callback(secondField, secondFieldValues[index]);
  };

  firstField.addEventListener('input', onFieldInput);
};
