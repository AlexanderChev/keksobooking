'use strict';

var ADS_COUNT = 8;

var AVATAR_PATH = 'img/avatars/user';

var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFER_PRICE_MIN = 1000;
var OFFER_PRICE_MAX = 1000000;

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPES_NAMES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Лачуга'
};

var OFFER_ROOMS_MIN = 1;
var OFFER_ROOMS_MAX = 5;

var OFFER_GUESTS_MIN = 1;
var OFFER_GUESTS_MAX = 10;

var OFFER_CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 100;
var LOCATION_Y_MAX = 500;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var mapElementsTemplate = document.querySelector('#map-elements-template').content;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomItem(arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
}

function getRandomSliceArray(array) {
  var copyArray = array.slice();
  var randomArrayLength = getRandomInt(0, copyArray.length);
  var count = copyArray.length - randomArrayLength;
  var index;

  for (var i = 0; i < count; i++) {
    index = getRandomInt(0, copyArray.length - i);
    copyArray.splice(index, 1);
  }

  return copyArray;
}

function getOfferType(value) {
  return OFFER_TYPES_NAMES[value];
}

function createDataOffers(count) {
  var data = [];
  var locationX;
  var locationY;

  for (var i = 0; i < count; i++) {
    locationX = getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
    locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);

    data.push({
      author: {
        avatar: AVATAR_PATH + (i < 10 ? 0 : '') + (i + 1) + '.png'
      },
      offer: {
        title: OFFER_TITLES[i],
        address: locationX + ',' + locationY,
        price: getRandomInt(OFFER_PRICE_MIN, OFFER_PRICE_MAX),
        type: getRandomItem(OFFER_TYPES),
        rooms: getRandomInt(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX),
        guests: getRandomInt(OFFER_GUESTS_MIN, OFFER_GUESTS_MAX),
        checkin: getRandomItem(OFFER_CHECKIN_HOURS),
        checkout: getRandomItem(OFFER_CHECKOUT_HOURS),
        features: getRandomSliceArray(OFFER_FEATURES),
        description: 'Это самое лучшее предложение на рынке',
        photos: OFFER_PHOTOS
      },
      location: {
        x: locationX,
        y: locationY,
      }
    });
  }

  return data;
}

function createMapPin(data) {
  var element = mapElementsTemplate.querySelector('.map__pin').cloneNode(true);
  element.querySelector('.map__pin img').src = data.author.avatar;
  element.style.top = (data.location.y - PIN_HEIGHT) + 'px';
  element.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';

  return element;
}

function createMapCard(data) {
  var element = mapElementsTemplate.querySelector('.map__card').cloneNode(true);
  element.style.display = 'none';
  element.querySelector('.popup__avatar').src = data.author.avatar;
  element.querySelector('.popup__title').textContent = data.offer.title;
  element.querySelector('.popup__text--address').textContent = data.address;
  element.querySelector('.popup__text--price').textContent = parseInt(data.offer.price, 10) + ' ₽/ночь';
  element.querySelector('.popup__type').textContent = getOfferType(data.offer.type);
  element.querySelector('.popup__text--capacity').textContent = data.offer.rooms + 'комнат для ' + data.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  var containerFeatures = element.querySelector('.popup__features');
  cleanParent(containerFeatures);

  for (var i = 0; i < data.offer.features.length; i++) {
    var item = document.createElement('li');
    item.classList.add('popup__feature', 'popup__feature--' + data.offer.features[i]);
    containerFeatures.appendChild(item);
  }

  element.querySelector('.popup__description').textContent = data.offer.description;

  var containerPhotos = element.querySelector('.popup__photos');
  var itemPhoto = containerPhotos.querySelector('.popup__photo');
  cleanParent(containerPhotos);

  for (var j = 0; j < data.offer.photos.length; j++) {
    var photo = itemPhoto.cloneNode(true);
    photo.src = data.offer.photos[j];
    containerPhotos.appendChild(photo);
  }

  return element;
}

function renderElements(container, callback) {
  var fragment = document.createDocumentFragment();
  var dataOffers = createDataOffers(ADS_COUNT);

  if (typeof callback === 'function') {
    for (var i = 0; i < dataOffers.length; i++) {
      fragment.appendChild(callback(dataOffers[i]));
    }
  }

  container.appendChild(fragment);
}

function cleanParent(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

var mapElement = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFieldsetList = adForm.querySelectorAll('fieldset');
var pinsContainer = document.querySelector('.map__pins');
var pinMain = mapElement.querySelector('.map__pin--main');

function setDisabledForm(state) {
  for (var i = 0; i < adFieldsetList.length; i++) {
    adFieldsetList[i].disabled = state;
  }

  if (state) {
    mapElement.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  } else {
    mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  }
}

setDisabledForm(true);

function onPinMouseUp() {
  pinMain.removeEventListener('mouseup', onPinMouseUp);
  renderElements(pinsContainer, createMapPin);
  renderElements(mapElement, createMapCard);
  setDisabledForm(false);
}

var pins = document.querySelectorAll('.map__pin');

function openPopUp(e) {
  var elementPin = e.target.closest('.map__pin');
  var popUp = document.querySelector('.popup');
  var popUpCloseBtn = popUp.querySelector('.popup__close');

  if (elementPin && !elementPin.classList.contains('map__pin--main')) {

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

function onPopUpEnterPress(e) {
  if (e.keyCode === ENTER_KEYCODE) {
    closePopUp();
  }
}

function onPopUpEscPress(e) {
  if (e.keyCode === ESC_KEYCODE) {
    closePopUp();
  }
}

function closePopUp() {
  document.querySelector('.popup').style.display = 'none';
  pins = document.querySelectorAll('.map__pin');
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('map__pin--active');
  }
}

pinMain.addEventListener('mouseup', onPinMouseUp);

pinsContainer.addEventListener('click', function (e) {
  openPopUp(e);
});

pinsContainer.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    openPopUp(e);
  }
});

var TYPES_MIN_PRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

var fielddType = document.querySelector('select[name="type"]');
var fieldPrice = document.querySelector('input[name="price"]');
var fieldTimein = document.querySelector('select[name="timein"]');
var fieldTimeout = document.querySelector('select[name="timeout"]');
var fieldRooms = document.querySelector('select[name="rooms"]');
var fieldGuests = document.querySelector('select[name="capacity"]');

fielddType.addEventListener('input', function () {
  fieldPrice.setAttribute('min', TYPES_MIN_PRICE[fielddType.value]);
});

fieldTimeout.value = fieldTimein.value;

document.querySelector('.ad-form__element--time').addEventListener('input', function (e) {
  if (e.target.closest('select[name="timein"]')) {
    fieldTimeout.value = fieldTimein.value;
  } else if (e.target.closest('select[name="timeout"]')) {
    fieldTimein.value = fieldTimeout.value;
  }
});

fieldRooms.addEventListener('input', function () {
  switch (fieldRooms.value) {
    case '1':
      fieldGuests.value = '1';
      break;
    case '2':
      fieldGuests.value = '2';
      break;
    case '3':
      fieldGuests.value = '3';
      break;
    case '100':
      fieldGuests.value = '0';
      break;
  }
});
