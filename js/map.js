'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFieldsetList = adForm.querySelectorAll('fieldset');


  function onSuccessSave() {
    adForm.reset();
  }

  function onError(errorText) {
    var node = document.createElement('div');
    node.className = 'error';
    node.textContent = errorText;
    document.body.appendChild(node);

    setTimeout(function () {
      document.body.removeChild(node);
    }, 3000);
  }

  function setActivePage(state) {
    for (var i = 0; i < adFieldsetList.length; i++) {
      adFieldsetList[i].disabled = state;
    }

    if (state) {
      mapElement.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
    } else {
      window.backend.load(window.pin.renderMapPin, onError);
      window.backend.load(window.card.renderMapCard, onError);
      mapElement.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      adForm.addEventListener('submit', function (evt) {
        window.backend.save(new FormData(adForm), onSuccessSave, onError);
        evt.preventDefault();
      });
    }
  }

  function onMouseDown(evt) {
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

    function onMouseMove(moveEvt) {
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
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setActivePage(true);
    pinMain.addEventListener('mousedown', onMouseDown);
  });
})();
