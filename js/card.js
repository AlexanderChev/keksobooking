'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

(function () {

/**
 * Соответствие данных типов жилья
 * названиям жилья в разметке
 * @type {Object.<string, string>}
 */
  var typeName = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  /**
   * Родительский элемент куда отрисовывается карточка объявления
   * @type {Element}
   */
  var container = document.querySelector('.map__pins');

  /**
   * Создает экземпляр карточки объявления
   * @constructor
   * @extends {OfferBase}
   */
  var Card = function () {
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onCloseEnterOrSpacePress = this._onCloseEnterOrSpacePress.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
  };

  /**
   * Создание карточки объявления
   * @override
   */
  Card.prototype.render = function () {
    var template = document.querySelector('#map-elements-template');

    if (this.element = 'content' in template) {
      this.element = template.content.querySelector('.popup').cloneNode(true);
    } else {
      this.element = template.querySelector('.popup').cloneNode(true);
    }

    this.element.querySelector('.popup__avatar').src = this._data.getAvatar();
    this.element.querySelector('.popup__title').textContent = this._data.getTitle();
    this.element.querySelector('.popup__text--address').textContent = this._data.getAddress();
    this.element.querySelector('.popup__text--price').textContent = parseInt(this._data.getPrice(), 10) + ' ₽/ночь';
    this.element.querySelector('.popup__type').textContent = typeName[this._data.getType()];
    this.element.querySelector('.popup__text--capacity').textContent = this._data.getRooms() + 'комнат для ' + this._data.getGuests() + ' гостей';
    this.element.querySelector('.popup__text--time').textContent = 'Заезд после ' + this._data.getCheckin() + ', выезд до ' + this._data.getCheckout();
    this.element.querySelector('.popup__description').textContent = this._data.getDescription();

    var featuresContainer = this.element.querySelector('.popup__features');

    window.util.removeElements(featuresContainer);

    this._data.getFeatures().forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
      featuresContainer.appendChild(featureElement);
    });

    var photosContainer = this.element.querySelector('.popup__photos');
    var photoTemplate = this.element.querySelector('.popup__photo');

    window.util.removeElements(photosContainer);

    this._data.getPhotos().forEach(function (photo) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosContainer.appendChild(photoElement);
    });

    container.appendChild(this.element);

    this._initializeListeners();
  };

  /**
   * Удаляет карточку объявления из DOM и все ее события
   */
  Card.prototype.remove = function () {
    var pins = document.querySelectorAll('.map__pin:not(map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }

    container.removeChild(this.element);

    this._removeListeners();
  };

  /**
   * @private
   * @override
   */
  Card.prototype._initializeListeners = function () {
    this._closeBtn = this.element.querySelector('.popup__close');
    this._closeBtn.addEventListener('click', this._onCloseClick);
    this._closeBtn.addEventListener('keydown', this._onClosEnterPress);
    this._closeBtn.addEventListener('keydown', this._onCloseSpacePress);
    document.addEventListener('keydown', this._onEscPress);
  };

  /**
   * @private
   * @override
   */
  Card.prototype._removeListeners = function () {
    this._closeBtn.removeEventListener('click', this._onCloseClick);
    this._closeBtn.removeEventListener('keydown', this._onCloseEnterOrSpacePress);
    document.removeEventListener('keydown', this._onEscPress);
  };

  Card.prototype._onCloseClick = function () {
    this.remove();
  };

  /**
   * @param {Event} evt
   */
  Card.prototype._onCloseEnterOrSpacePress = function (evt) {
    window.util.isEnterOrSpaceEvent(evt, this.remove.bind(this));
  };

  /**
   * @param {Event} evt
   */
  Card.prototype._onEscPress = function (evt) {
    window.util.isEscEvent(evt, this.remove.bind(this));
  };

  window.Card = Card;

})();
