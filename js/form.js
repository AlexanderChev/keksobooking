'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

(function () {
  var fieldType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');
  var fieldTimein = document.querySelector('#timein');
  var fieldTimeout = document.querySelector('#timeout');
  var fieldRooms = document.querySelector('#room_number');
  var fieldGuests = document.querySelector('#capacity');

  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var FORM_TYPES_PRICES = ['1000', '0', '5000', '10000'];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = [
    ['1'],
    ['1', '2'],
    ['1', '2', '3'],
    ['0']
  ];

  /**
   * @callback synchronizeFields~syncValues
   * @param {Element} element
   * @param {string} value
   */
  var syncValues = function (element, value) {
    element.value = value;
  };

  /**
  * @callback synchronizeFields~syncValueWithMin
  * @param {Element} element
  * @param {string} value
  */
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  /**
  * @callback synchronizeFields~syncRoomsAndCapacities
  * @param {Element} element
  * @param {Array.<string>} values
  */
  var syncRoomsAndCapacities = function (element, values) {
    var option;
    for (var i = 0; i < element.options.length; i++) {
      option = element.options[i];

      if (values.indexOf(option.value) !== -1) {
        option.disabled = false;
        option.selected = true;
      } else {
        option.disabled = true;
      }
    }
  };

  window.synchronizeFields(fieldType, fieldPrice, FORM_TYPES, FORM_TYPES_PRICES, syncValueWithMin);
  window.synchronizeFields(fieldTimein, fieldTimeout, FORM_CHECKINS, FORM_CHECKOUTS, syncValues);
  window.synchronizeFields(fieldTimeout, fieldTimein, FORM_CHECKOUTS, FORM_CHECKINS, syncValues);
  window.synchronizeFields(fieldRooms, fieldGuests, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, syncRoomsAndCapacities);
})();
