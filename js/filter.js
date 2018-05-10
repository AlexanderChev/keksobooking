'use strict';

(function () {
  var fieldType = document.querySelector('#housing-type');
  var fieldPrice = document.querySelector('#housing-price');
  var fieldRooms = document.querySelector('#housing-rooms');
  var fieldGuests = document.querySelector('#housing-guests');
  var features;

  /**
   * Стандартное значение полей
   * @type {string}
   */
  var DEFAULT_VALUE = 'any';

  /**
   * Соответствие диапазонам цен
   * @type {Object.<string, Object>}
   */
  var priceLevel = {
    'low': {
      min: 0,
      max: 9999
    },
    'middle': {
      min: 10000,
      max: 49999
    },
    'high': {
      min: 50000,
      max: 1000000
    },
    'any': {
      min: 0,
      max: 1000000
    }
  };

  /**
   * @param {Object} offer
   * @return {boolean}
   */
  var filterToType = function (offer) {
    return fieldType.value === DEFAULT_VALUE ? true : fieldType.value === offer.getType();
  };

  /**
   * @param {Object} offer
   * @return {boolean}
   */
  var filterToPrice = function (offer) {
    var priceValue = priceLevel[fieldPrice.value];
    return offer.getPrice() >= priceValue.min && offer.getPrice() <= priceValue.max;
  };

  /**
   * @param {Object} offer
   * @return {boolean}
   */
  var filterToRooms = function (offer) {
    return fieldRooms.value === DEFAULT_VALUE ? true : +fieldRooms.value === offer.getRooms();
  };

  /**
   * @param {Object} offer
   * @return {boolean}
   */
  var filterToGuests = function (offer) {
    return fieldGuests.value === DEFAULT_VALUE ? true : +fieldGuests.value === offer.getGuests();
  };

  /**
   * @param {Object} offer
   * @return {boolean}
   */
  var filterToFeatures = function (offer) {
    features = document.querySelectorAll('input[name=features]:checked');
    var filtered = true;

    if (features.length) {
      Array.prototype.forEach.call(features, function (item) {
        if (offer.getFeatures().indexOf(item.value) === -1) {
          filtered = false;
        }
      });
    }
    return filtered;
  };

  /**
   * Фильтрует список объявлений
   * @param {Array.<Object>} offers
   * @return {Array.<Object>}
   */
  window.filterOffers = function (offers) {
    var filteredOffers = offers.slice(0);

    filteredOffers = filteredOffers
        .filter(filterToType)
        .filter(filterToPrice)
        .filter(filterToRooms)
        .filter(filterToGuests)
        .filter(filterToFeatures);

    return filteredOffers;
  };
})();

