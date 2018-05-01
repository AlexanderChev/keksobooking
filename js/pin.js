'use strict';

window.pin = function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapElementsTemplate = document.querySelector('#map-elements-template').content;

  function createMapPin(data) {
    var element = mapElementsTemplate.querySelector('.map__pin').cloneNode(true);
    element.querySelector('.map__pin img').src = data.author.avatar;
    element.style.top = (data.location.y - PIN_HEIGHT) + 'px';
    element.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';

    return element;
  }

  return {
    renderMapPin: function (offers) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offers.length; i++) {
        fragment.appendChild(createMapPin(offers[i]));
      }

      document.querySelector('.map__pins').appendChild(fragment);
    }
  };
}();
