'use strict';

/**
 * @fileoverview
 * @author Alexander Egorichev
 */

(function () {
  var mapElement = document.querySelector('.map');
  var pinsContainer = mapElement.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFieldsetList = adForm.querySelectorAll('fieldset');

  /**
   * Устанавливает активный класс при клике на метку объявления
   * @param {Element} currentPin
   */
  var setActivePin = function (currentPin) {
    var pins = document.querySelectorAll('.map__pin:not(map__pin--main');

    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
    currentPin.classList.add('map__pin--active');
  };

  /**
   * Отрисовка меток объявлений
   * @param {Array.<Object>} offers
   */
  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    var offersList = offers.slice(0);

    offersList = offersList.map(function (offer) {
      var pinElement = new Pin();
      pinElement.setData(offer);
      pinElement.render();
      fragment.appendChild(pinElement.element);

      /**
       * @callback Pin~eventHandler
       */
      pinElement.eventHandler = function () {
        setActivePin(pinElement.element);

        var cardElement = new Card();
        cardElement._data = pinElement._data;

        var popUp = pinsContainer.querySelector('.popup');
        if (popUp) {
          pinsContainer.removeChild(popUp);
        }
        cardElement.render();
      };

      return pinElement;
    });

    pinsContainer.appendChild(fragment);
  };

  /**
   * Обработчик успешной отправки данных на сервер с ресетом всех полей формы
   */
  var onSuccessSave = function () {
    adForm.reset();
  };

  /**
   * Обработчик успешной загрузки данный с сервера,
   * создание объектов с данными
   * @param {Array.<Object>} data
   */
  var onSuccessLoad = function (data) {
    var loadedOffers = data.map(function (offer) {
      return new OfferData(offer);
    });
    renderPins(loadedOffers);
  };

  /**
   * Делает активной карту и форму, загружает списки объявлений,
   * добавляет обработчик событий на форму.
   * @param {boolean=} state
   */
  var setActivePage = function (state) {
    for (var i = 0; i < adFieldsetList.length; i++) {
      adFieldsetList[i].disabled = state;
    }

    if (state) {
      mapElement.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
    } else {
      window.backend.load(onSuccessLoad, window.util.onError);

      mapElement.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      adForm.addEventListener('submit', function (evt) {
        window.backend.save(new FormData(adForm), onSuccessSave, window.util.onError);
        evt.preventDefault();
      });
    }
  };

  /**
   * @param {Event} evt
   */
  var onMouseDown = function (evt) {
    evt.preventDefault();

    if (mapElement.classList.contains('map--faded')) {
      setActivePage(false);
    }

    var PIN_MAIN_WIDTH = 65;
    var PIN_MAIN_HEIGHT = 87;
    var Ymin = 100;
    var Ymax = 500;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * @param {Event} moveEvt
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var posY = pinMain.offsetTop - shift.y;
      var posX = pinMain.offsetLeft - shift.x;

      if (posX < 0) {
        posX = 0;
      }

      if (posX > mapElement.offsetWidth - PIN_MAIN_WIDTH) {
        posX = mapElement.offsetWidth - PIN_MAIN_WIDTH;
      }

      if (posY < Ymin) {
        posY = Ymin;
      }

      if (posY > Ymax + PIN_MAIN_HEIGHT) {
        posY = Ymax + PIN_MAIN_HEIGHT;
      }

      pinMain.style.zIndex = '2';
      pinMain.style.top = posY + 'px';
      pinMain.style.left = posX + 'px';
      document.querySelector('#address').value = 'x: ' + (posX + PIN_MAIN_WIDTH / 2) +
      ' y: ' + (posY + PIN_MAIN_HEIGHT);
    };

    /**
     * @param {Event} upEvt
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('DOMContentLoaded', function () {
    setActivePage(true);
    pinMain.addEventListener('mousedown', onMouseDown);
  });
})();
