'use strict';
(function () {

  var map = document.querySelector('.map');

  var pinContainer = document.querySelector('.map__pins');

  var cardContainer = document.querySelector('.map');

  var commercialTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var insertBeforeThisElement = document.querySelector('.map__filters-container');

  var adForm = document.querySelector('.ad-form');

  var mainPin = document.querySelector('.map__pin--main');

  var fieldsets = document.getElementsByTagName('fieldset');

  var selects = document.getElementsByTagName('select');

  window.disableInputs(fieldsets);

  window.disableInputs(selects);

  var addressInput = document.getElementById('address');

  var getAddress = function () {
    var locX = parseInt(mainPin.style.left, 10);
    var locY = parseInt(mainPin.style.top, 10);
    return (locX + 31) + ',' + (locY + 79);
  };
  mainPin.addEventListener('mousedown', function () {
    if (map.classList.contains('map--faded')) {
      window.enableInputs(fieldsets);
      window.enableInputs(selects);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      pinContainer.appendChild(window.fragment);
      var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
      for (var t = 0; t < mapPins.length; t++) {
        var mapPin = mapPins[t];
        mapPin.setAttribute('data-index', t);
        mapPin.addEventListener('click', showCard);
      }
    }
  });

  var showCard = function (evt) {
    var pinIndex = evt.currentTarget.getAttribute('data-index');
    var card = document.querySelector('article.map__card');
    if (card) {
      map.removeChild(card);
    }
    cardContainer.insertBefore(window.renderCard(window.mapTest[pinIndex], commercialTemplate), insertBeforeThisElement);
    document.addEventListener('keydown', closeCard);
    document.querySelector('article.map__card').querySelector('button.popup__close').addEventListener('click', function () {
      map.removeChild(document.querySelector('article.map__card'));
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    });
    var pins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    for (var q = 0; q < pins.length; q++) {
      pins[q].classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active');
    document.addEventListener('keydown', closeCard);
  };

  var closeCard = function (e) {
    if (e.keyCode === 27 && map.querySelector('article.map__card')) {
      map.removeChild(document.querySelector('article.map__card'));
      document.removeEventListener('keydown', closeCard);
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };
  var showAddress = function () {
    addressInput.setAttribute('value', getAddress());
  };
  mainPin.addEventListener('mousemove', showAddress);
  mainPin.addEventListener('mousedown', function (dragEvt) {
    dragEvt.preventDefault();
    var startCoords = {
      x: dragEvt.clientX,
      y: dragEvt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      if (mainPin.offsetLeft - shift.x <= 0) {
        mainPin.style.left = 0 + 'px';
      } else if (mainPin.offsetLeft - shift.x >= 1138) {
        mainPin.style.left = 1138 + 'px';
      }
      if (mainPin.offsetTop - shift.y < 100) {
        mainPin.style.top = 100 + 'px';
      } else if (mainPin.offsetTop - shift.y > 630) {
        mainPin.style.top = 630 + 'px';
      }

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
