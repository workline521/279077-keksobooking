'use strict';
(function () {

  var pinContainer = document.querySelector('.map__pins');
  var cardContainer = document.querySelector('.map');
  var insertBeforeThisElement = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var fragment = document.createDocumentFragment();

  var onLoad = function (data) {
    window.mapData = data;
    window.mapData.forEach(function (it, index) {
      it.id = index;
    });
    var limitedPinsLength = window.mapData.length > 5 ? 5 : window.mapData.length;
    for (var i = 0; i < limitedPinsLength; i++) {
      fragment.appendChild(window.pin.render(window.mapData[i]));
    }
    pinContainer.appendChild(fragment);
    var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    for (var j = 0; j < limitedPinsLength; j++) {
      var mapPin = mapPins[j];
      mapPin.dataset.index = window.mapData[j].id;
      mapPin.addEventListener('click', showCard);
    }
  };
  var onDownload = function () {
    window.backend.getData(onLoad, onSubmitError);
    mainPin.removeEventListener('mousedown', onDownload);
  };

  mainPin.addEventListener('mousedown', onDownload);

  mainPin.addEventListener('mousedown', function () {
    if (cardContainer.classList.contains('map--faded')) {
      window.form.enableInputs(fieldsets);
      window.form.enableInputs(selects);
      cardContainer.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    }
  });

  var showCard = function (evt) {
    var pinIndex = evt.currentTarget.dataset.index;
    var card = document.querySelector('article.map__card');
    if (card) {
      cardContainer.removeChild(card);
    }
    cardContainer.insertBefore(window.card.render(window.mapData[pinIndex]), insertBeforeThisElement);
    cardContainer.querySelector('article.map__card').querySelector('button.popup__close').addEventListener('click', function () {
      cardContainer.removeChild(cardContainer.querySelector('article.map__card'));
      cardContainer.querySelector('.map__pin--active').classList.remove('map__pin--active');
    });
    var pins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    pins.forEach(function (it) {
      it.classList.remove('map__pin--active');
    });
    evt.currentTarget.classList.add('map__pin--active');
    document.addEventListener('keydown', closeCard);
  };

  var closeCard = function (e) {
    if (e.keyCode === 27 && cardContainer.querySelector('article.map__card')) {
      cardContainer.removeChild(document.querySelector('article.map__card'));
      document.removeEventListener('keydown', closeCard);
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };


  var addressInput = document.querySelector('#address');
  var pinHeight = mainPin.offsetHeight + 17;
  var pinWidth = Math.floor(mainPin.offsetWidth / 2);
  var getAddress = function () {
    var locX = parseInt(mainPin.style.left, 10);
    var locY = parseInt(mainPin.style.top, 10);
    return (locX + pinWidth) + ',' + (locY + pinHeight);
  };

  mainPin.addEventListener('mousedown', function (dragEvt) {
    dragEvt.preventDefault();

    var mainPinHalfWidth = mainPin.offsetWidth / 2;
    var mainPinHalfHeight = mainPin.offsetHeight / 2;
    var startCoords = {
      x: dragEvt.clientX,
      y: dragEvt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var mapRect = cardContainer.getBoundingClientRect();
      var minX = mapRect.x + mainPinHalfWidth;
      var maxX = mapRect.x + mapRect.width - mainPinHalfWidth;
      var minY = mapRect.y + mainPinHalfHeight + 130;
      var maxY = mapRect.y + mapRect.height - mainPinHalfHeight - 45;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      if (moveEvt.clientX < minX) {
        startCoords.x = minX;
      } else if (moveEvt.clientX > maxX) {
        startCoords.x = maxX;
      } else {
        startCoords.x = moveEvt.clientX;
      }
      if (moveEvt.clientY < minY) {
        startCoords.y = minY;
      } else if (moveEvt.clientY > maxY) {
        startCoords.y = maxY;
      } else {
        startCoords.y = moveEvt.clientY;
      }

      var x = mainPin.offsetLeft - shift.x;
      var y = mainPin.offsetTop - shift.y;

      if (x < 0) {
        mainPin.style.left = 0 + 'px';
      } else if (x > 1138) {
        mainPin.style.left = 1138 + 'px';
      } else {
        mainPin.style.left = x + 'px';
      }
      if (y < 130) {
        mainPin.style.top = 130 + 'px';
      } else if (y > 630) {
        mainPin.style.top = 630 + 'px';
      } else {
        mainPin.style.top = y + 'px';
      }
      addressInput.value = getAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      addressInput.value = getAddress();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var resetBtn = document.querySelector('.ad-form__reset');
  var onReset = function () {
    window.filter.removeMapData();
    adForm.reset();
    var uploadedPhotos = document.querySelectorAll('.ad-form__photo');
    if (uploadedPhotos) {
      uploadedPhotos.forEach(function (it) {
        it.remove();
      });
    }
    adForm.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
    window.form.disableInputs(fieldsets);
    window.form.disableInputs(selects);
    cardContainer.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('mousedown', onDownload);
    mainPin.style = 'left: 570px; top: 375px;';
  };
  resetBtn.addEventListener('click', onReset);


  var main = document.querySelector('main');

  var showSuccess = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    successElement.addEventListener('mousedown', closeSuccess);
    main.appendChild(successElement);
    document.addEventListener('keydown', closeSuccess);
  };

  var closeSuccess = function () {
    var successElement = document.querySelector('.success');
    main.removeChild(successElement);
    document.removeEventListener('keydown', closeSuccess);
  };
  var onSubmitError = function (errorMessage) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorText = error.querySelector('.error__message');
    errorText.textContent = errorMessage;
    main.appendChild(errorElement);
    document.addEventListener('keydown', closeError);
    errorElement.addEventListener('click', closeError);
  };
  var closeError = function () {
    var errorElement = document.querySelector('.error');
    main.removeChild(errorElement);
    document.removeEventListener('keydown', closeError);
    errorElement.removeEventListener('click', closeError);
  };
  var onSubmit = function () {
    onReset();
    showSuccess();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(adForm), onSubmit, onSubmitError);
    evt.preventDefault();
  });
  window.map = {
    showCard: showCard
  };
})();

