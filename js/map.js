'use strict';
(function () {

  var pinContainer = document.querySelector('.map__pins');
  var cardContainer = document.querySelector('.map');
  var insertBeforeThisElement = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var addressInput = document.querySelector('#address');
  var fragment = document.createDocumentFragment();

  var onLoad = function (data) {
    window.mapData = data.slice(0, 5);
    console.log(window.mapData);
    for (var i = 0; i < window.mapData.length; i++) {
      fragment.appendChild(window.pin.render(window.mapData[i]));
    }
    pinContainer.appendChild(fragment);
    var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (it, index) {
      it.dataset.index = index;
      it.addEventListener('click', showCard);
    });
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

  // высота карточки + псевдоэлемент after
  var pinHeight = mainPin.offsetHeight + 17;
  var pinWidth = Math.floor(mainPin.offsetWidth / 2);
  var getAddress = function () {
    var locX = parseInt(mainPin.style.left, 10);
    var locY = parseInt(mainPin.style.top, 10);
    return (locX + pinWidth) + ',' + (locY + pinHeight);
  };

  mainPin.addEventListener('mousemove', function () {
    addressInput.value = getAddress();
  });

  //  драгэндроп для главной метки

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
      cardContainer.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    cardContainer.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var resetBtn = document.querySelector('.ad-form__reset');
  var onReset = function () {
    window.filter.removeMapData();
    adForm.reset();
    var uploadedPhotos = document.querySelectorAll('.ad-form__photo');
    uploadedPhotos.forEach(function (it) {
      it.remove();
    });
    window.form.disableInputs(fieldsets);
    window.form.disableInputs(selects);
    cardContainer.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('mousedown', onDownload);
    mainPin.style = 'left: 570px; top: 375px;';
  };
  resetBtn.addEventListener('click', onReset);
  //  отправка данных на сервак

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
    adForm.reset();
    mainPin.style = 'left: 570px; top: 375px;';
    cardContainer.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.filter.removeMapData();
    showSuccess();
    window.form.disableInputs(fieldsets);
    window.form.disableInputs(selects);
    mainPin.addEventListener('mousedown', onDownload);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(adForm), onSubmit, onSubmitError);
    evt.preventDefault();
  });
  window.map = {
    closeCard: closeCard
  };
})();

