'use strict';

window.card = function () {

  var mapElementsTemplate = document.querySelector('#map-elements-template').content;

  function createMapCard(data) {
    var element = mapElementsTemplate.querySelector('.map__card').cloneNode(true);
    element.style.display = 'none';
    element.querySelector('.popup__avatar').src = data.author.avatar;
    element.querySelector('.popup__title').textContent = data.offer.title;
    element.querySelector('.popup__text--address').textContent = data.address;
    element.querySelector('.popup__text--price').textContent = parseInt(data.offer.price, 10) + ' ₽/ночь';
    element.querySelector('.popup__type').textContent = data.offer.type;
    element.querySelector('.popup__text--capacity').textContent = data.offer.rooms + 'комнат для ' + data.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var containerFeatures = element.querySelector('.popup__features');
    window.util.removeElements(containerFeatures);

    data.offer.features.forEach(function (feature) {
      var node = document.createElement('li');
      node.classList.add('popup__feature', 'popup__feature--' + feature);
      containerFeatures.appendChild(node);
    });

    element.querySelector('.popup__description').textContent = data.offer.description;

    var containerPhotos = element.querySelector('.popup__photos');
    var itemPhoto = containerPhotos.querySelector('.popup__photo');
    window.util.removeElements(containerPhotos);

    for (var j = 0; j < data.offer.photos.length; j++) {
      var photo = itemPhoto.cloneNode(true);
      photo.src = data.offer.photos[j];
      containerPhotos.appendChild(photo);
    }

    return element;
  }

  return {
    renderMapCard: function (offers) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offers.length; i++) {
        fragment.appendChild(createMapCard(offers[i]));
      }

      document.querySelector('.map__pins').appendChild(fragment);
    }
  };
}();
