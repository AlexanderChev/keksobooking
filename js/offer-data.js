'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

(function () {
  /**
   * @param {Object} data
   * @constructor
   */
  var OfferData = function (data) {
    this.params = data;
  };

  /**
   * @return {string}
   */
  OfferData.prototype.getAvatar = function () {
    return this.params.author.avatar;
  };

  /**
   * @return {string}
   */
  OfferData.prototype.getTitle = function () {
    return this.params.offer.title;
  };

  /**
   * @return {string}
   */
  OfferData.prototype.getAddress = function () {
    return this.params.offer.address;
  };

  /**
   * @return {number}
   */
  OfferData.prototype.getPrice = function () {
    return this.params.offer.price;
  };

  /**
   * @return {string}
   */
  OfferData.prototype.getType = function () {
    return this.params.offer.type;
  };

  /**
   * @return {number}
   */
  OfferData.prototype.getRooms = function () {
    return this.params.offer.rooms;
  };

  /**
   * @return {number}
   */
  OfferData.prototype.getGuests = function () {
    return this.params.offer.guests;
  };

  /**
   * @return {string}
   */
  OfferData.prototype.getCheckin = function () {
    return this.params.offer.checkin;
  };

  /**
   * @return {string}
   */
  OfferData.prototype.getCheckout = function () {
    return this.params.offer.checkout;
  };

  /**
   * @return {Array.<string>}
   */
  OfferData.prototype.getFeatures = function () {
    return this.params.offer.features;
  };

  /**
   * @return {string}
   */
  OfferData.prototype.getDescription = function () {
    return this.params.offer.description;
  };

  /**
   * @return {Array.<string>}
   */
  OfferData.prototype.getPhotos = function () {
    return this.params.offer.photos;
  };

  /**
   * @return {number}
   */
  OfferData.prototype.getLocationX = function () {
    return this.params.location.x;
  };

  /**
   * @return {number}
   */
  OfferData.prototype.getLocationY = function () {
    return this.params.location.y;
  };

  window.OfferData = OfferData;

})();
