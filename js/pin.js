'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var render = function (mapTemplate) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.top = mapTemplate.location.y + 'px';
    pinElement.style.left = mapTemplate.location.x + 'px';
    pinElement.querySelector('img').src = mapTemplate.author.avatar;
    pinElement.querySelector('img').alt = mapTemplate.offer.title;
    return pinElement;
  };
  window.pin = {
    render: render
  };
})();
