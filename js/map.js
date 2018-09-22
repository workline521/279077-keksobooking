'use strict';
(function () {

  var map = document.querySelector('.map');
  var pinContainer = document.querySelector('.map__pins');
  var cardContainer = document.querySelector('.map');
  var insertBeforeThisElement = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var addressInput = document.querySelector('#address');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.mapTest.length; i++) {
    fragment.appendChild(window.pin.render(window.data.mapTest[i]));
  }

  mainPin.addEventListener('mousedown', function () {
    if (map.classList.contains('map--faded')) {
      window.form.enableInputs(fieldsets);
      window.form.enableInputs(selects);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      pinContainer.appendChild(fragment);
      var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
      for (var t = 0; t < mapPins.length; t++) {
        var mapPin = mapPins[t];
        mapPin.dataset.index = t;
        mapPin.addEventListener('click', showCard);
      }
    }
  });

  var showCard = function (evt) {
    var pinIndex = evt.currentTarget.dataset.index;
    var card = document.querySelector('article.map__card');
    if (card) {
      map.removeChild(card);
    }
    cardContainer.insertBefore(window.card.render(window.data.mapTest[pinIndex]), insertBeforeThisElement);
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

  var pinWidth = Math.floor(mainPin.offsetWidth / 2);
  // высота карточки + псевдоэлемент after
  var pinHeight = mainPin.offsetHeight + 17;
  var getAddress = function () {
    var locX = parseInt(mainPin.style.left, 10);
    var locY = parseInt(mainPin.style.top, 10);
    return (locX + pinWidth) + ',' + (locY + pinHeight);
  };

  mainPin.addEventListener('mousemove', function () {
    addressInput.value = getAddress();
  });

  mainPin.addEventListener('mousedown', function (dragEvt) {
    dragEvt.preventDefault();
    var startCoords = {
      x: dragEvt.clientX,
      y: dragEvt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var customY = moveEvt.clientY;
      if (customY < 100) {
        customY = 100;
      } else if (customY > 630) {
        customY = 630;
      }
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - customY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: customY
      };
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
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
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
