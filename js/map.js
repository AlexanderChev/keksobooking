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
  'bungalo': 'Бунгало'
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

var mapElement = document.querySelector('.map');
var mapElementsTemplate = document.querySelector('#map-elements-template').content;
mapElement.classList.remove('map--faded');

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

renderElements(document.querySelector('.map__pins'), createMapPin);
renderElements(mapElement, createMapCard);

