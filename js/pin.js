'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  window.pin = {
    fragment: fragment
  };
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPins = function (mapTemplate) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.top = mapTemplate.location.y + 'px';
    pinElement.style.left = mapTemplate.location.x + 'px';
    pinElement.querySelector('img').src = mapTemplate.author.avatar;
    pinElement.querySelector('img').alt = mapTemplate.offer.title;
    return pinElement;
  };

  for (var i = 0; i < window.data.mapTest.length; i++) {
    fragment.appendChild(renderPins(window.data.mapTest[i]));

  }
})();
