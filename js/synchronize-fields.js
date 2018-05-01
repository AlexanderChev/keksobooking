'use strict';

window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, callback) {
  function onFieldInput() {
    var index = firstFieldValues.indexOf(firstField.value);
    callback(secondField, secondFieldValues[index]);
  }

  firstField.addEventListener('input', onFieldInput);
};
