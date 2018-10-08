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
    var len = window.mapData.length > 5 ? 5 : window.mapData.length;
    for (var i = 0; i < len; i++) {
      fragment.appendChild(window.pin.render(window.mapData[i]));
    }
    pinContainer.appendChild(fragment);
    var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    for (var j = 0; j < len; j++) {
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

  mainPin.addEventListener('mousemove', function () {
    addressInput.value = cardContainer.classList.contains('map--faded') ? '' : getAddress();
  });
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 1;
  var MAX_X = 1135;
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

      var limitY;
      var limitX;
      if (mainPin.offsetTop < MIN_Y) {
        limitY = MIN_Y;
      } else if (mainPin.offsetTop > MAX_Y) {
        limitY = MAX_Y;
      } else {
        limitY = mainPin.offsetTop - shift.y;
      }
      if (mainPin.offsetLeft < MIN_X) {
        limitX = MIN_X;
      } else if (mainPin.offsetLeft > MAX_X) {
        limitX = MAX_X;
      } else {
        limitX = mainPin.offsetLeft - shift.x;
      }
      mainPin.style.top = limitY + 'px';
      mainPin.style.left = limitX + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
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

