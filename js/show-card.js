'use strict';

window.showCard = function () {
  var ENTER_KEYCODE = 13;
  var pinsContainer = document.querySelector('.map__pins');
  var pins;

  pinsContainer.addEventListener('click', function (e) {
    openPopUp(e);
  });

  pinsContainer.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      openPopUp(e);
    }
  });

  function openPopUp(e) {
    var elementPin = e.target.closest('.map__pin');
    var popUp = document.querySelector('.popup');
    var popUpCloseBtn = popUp.querySelector('.popup__close');

    if (elementPin && !elementPin.classList.contains('map__pin--main')) {
      pins = document.querySelectorAll('.map__pin');
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('map__pin--active');
      }

      elementPin.classList.add('map__pin--active');
      popUp.style.display = 'block';

      popUpCloseBtn.addEventListener('click', function () {
        closePopUp();
      });

      popUpCloseBtn.addEventListener('keydown', onPopUpEnterPress);
      document.addEventListener('keydown', onPopUpEscPress);
    }
  }

  function onPopUpEnterPress(evt) {
    window.util.isEnterEvent(evt, closePopUp);
  }

  function onPopUpEscPress(evt) {
    window.util.isEscEvent(evt, closePopUp);
  }

  function closePopUp() {
    document.querySelector('.popup').style.display = 'none';
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('map__pin--active');
    }
  }
}();
