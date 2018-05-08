'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

(function () {
  /**
   * @const
   * @type {number}
   */
  var PIN_WIDTH = 50;

  /**
   * @const
   * @type {number}
   */
  var PIN_HEIGHT = 70;

  /**
   * Создает метку на карте
   * @constructor
   * @extends {OfferBase}
   */
  var Pin = function () {
    this._onClick = this._onClick.bind(this);
  };

  Pin.prototype = Object.create(OfferBase.prototype);

  /**
   * Создание пина из шаблона
   * @override
   */
  Pin.prototype.render = function () {
    var template = document.querySelector('#map-elements-template');

    if (this.element = 'content' in template) {
      this.element = template.content.querySelector('.map__pin').cloneNode(true);
    } else {
      this.element = template.querySelector('.map__pin').cloneNode(true);
    }

    this.element.querySelector('.map__pin img').src = this._data.getAvatar();
    this.element.style.top = (this._data.getLocationY() - PIN_HEIGHT) + 'px';
    this.element.style.left = (this._data.getLocationX() - PIN_WIDTH / 2) + 'px';

    this._initializeListeners();
  };

  /**
   * @private
   * @override
   */
  Pin.prototype._initializeListeners = function () {
    this.element.addEventListener('click', this._onClick);
    this.element.addEventListener('keydown', this._onPinEnterPress);
  };

  /**
   * @private
   * @param {Event} evt
   */
  Pin.prototype._onClick = function (evt) {
    if (evt.target.closest('.map__pin:not(map__pin--main)')) {
      if (typeof this.eventHandler === 'function') {
        this.eventHandler();
      }
    }
  };

  /**
   * @private
   * @param {Event} evt
   */
  Pin.prototype._onPinEnterPress = function (evt) {
    if (evt.target.closest('.map__pin:not(map__pin--main)')) {
      if (typeof this.eventHandler === 'function') {
        window.util.isEnterOrSpaceEvent(evt, this.eventHandler);
      }
    }
  };

  /**
   * @type {?Function}
   */
  Pin.prototype.eventHandler = null;

  window.Pin = Pin;

})();
