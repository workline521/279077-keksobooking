'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var makeElement = function (tagName, elementClass, bemModificator) {
    var element = document.createElement(tagName);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    if (bemModificator) {
      element.classList.add(elementClass + '--' + bemModificator);
    }
    return element;
  };

  var translateApartmentsName = function (englishText) {
    var russianText;
    if (englishText === 'palace') {
      russianText = 'Дворец';
    } else if (englishText === 'flat') {
      russianText = 'Квартира';
    } else if (englishText === 'house') {
      russianText = 'Дом';
    } else if (englishText === 'bungalo') {
      russianText = 'Бунгало';
    }
    return russianText;
  };

  var showRoomsAndGuests = function (roomsNumber, guestsNumber) {
    var roomText = ' комнаты для ';
    var guestText = ' гостей';
    if (guestsNumber === 1) {
      guestText = ' гостя';
    } else {
      guestText = ' гостей';
    }
    if (roomsNumber === 1) {
      roomText = ' комната для ';
    } else if (roomsNumber > 1 && roomsNumber < 5) {
      roomText = ' комнаты для ';
    } else {
      roomText = ' комнат для ';
    }
    return roomsNumber + roomText + guestsNumber + guestText;
  };

  var render = function (mapCard) {
    var cardBody = cardTemplate.cloneNode(true);
    cardBody.querySelector('img').src = mapCard.author.avatar;
    cardBody.querySelector('.popup__title').textContent = mapCard.offer.title;
    cardBody.querySelector('.popup__text--address').textContent = mapCard.offer.address;
    cardBody.querySelector('.popup__text--price').textContent = mapCard.offer.price + ' ₽/ночь';
    cardBody.querySelector('.popup__type').textContent = translateApartmentsName(mapCard.offer.type);
    cardBody.querySelector('.popup__text--capacity').textContent = showRoomsAndGuests(mapCard.offer.rooms, mapCard.offer.guests);
    var checkIn = mapCard.offer.checkin;
    var checkOut = mapCard.offer.checkout;
    cardBody.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkIn + ', выезд до' + checkOut;
    var liContainer = cardBody.querySelector('.popup__features');
    var li = cardBody.querySelectorAll('.popup__feature');
    for (var l = 0; l < li.length; l++) {
      liContainer.removeChild(li[l]);
    }
    var features = mapCard.offer.features;
    var featuresContainer = cardBody.querySelector('.popup__features');
    for (var j = 0; j < features.length; j++) {
      var newElement = makeElement('li', 'popup__feature', features[j]);
      featuresContainer.appendChild(newElement);
    }
    var cardDescription = mapCard.offer.description;
    if (cardDescription !== '') {
      cardBody.querySelector('.popup__description').textContent = cardDescription;
    }
    var cardPhotos = mapCard.offer.photos;
    cardBody.querySelector('.popup__photos').removeChild(cardBody.querySelector('.popup__photo'));
    var photosContainer = cardBody.querySelector('.popup__photos');
    for (var k = 0; k < cardPhotos.length; k++) {
      var newPicture = makeElement('img', 'popup__photo');
      newPicture.setAttribute('src', cardPhotos[k]);
      newPicture.setAttribute('width', 45);
      newPicture.setAttribute('height', 45);
      newPicture.setAttribute('alt', 'Фотография жилья');
      photosContainer.appendChild(newPicture);
    }
    return cardBody;
  };
  window.card = {
    render: render,
    makeElement: makeElement
  };
})();
