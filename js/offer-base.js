'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

(function () {
  /**
   * @constructor
   */
  var OfferBase = function () {};

  /**
   * @type {?OfferData}
   */
  OfferBase.prototype._data = null;

  OfferBase.prototype.render = function () {};

  OfferBase.prototype.remove = function () {};

  OfferBase.prototype._initializeListeners = function () {};

  OfferBase.prototype._removeListeners = function () {};

  /**
   * @param {Object|null} data
   */
  OfferBase.prototype.setData = function (data) {
    this._data = data;
  };

  /**
   * @return {?OfferData}
   */
  OfferBase.prototype.getData = function () {
    return this._data;
  };

  window.OfferBase = OfferBase;

})();

