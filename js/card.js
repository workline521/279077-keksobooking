'use strict';

(function () {
  var makeElement = function (tagName, elementClass, bemModificator) {
    var element = document.createElement(tagName);
    element.classList.add(elementClass);
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

  var renderCard = function (mapTestObject, cardTemplate) {
    var cardBody = cardTemplate.cloneNode(true);
    cardBody.querySelector('img').src = mapTestObject.author.avatar;
    cardBody.querySelector('.popup__title').textContent = mapTestObject.offer.title;
    cardBody.querySelector('.popup__text--address').textContent = mapTestObject.offer.address;
    cardBody.querySelector('.popup__text--price').textContent = mapTestObject.offer.price + ' ₽/ночь';
    cardBody.querySelector('.popup__type').textContent = translateApartmentsName(mapTestObject.offer.type);
    cardBody.querySelector('.popup__text--capacity').textContent = showRoomsAndGuests(mapTestObject.offer.rooms, mapTestObject.offer.guests);
    var checkIn = mapTestObject.offer.checkin;
    var checkOut = mapTestObject.offer.checkout;
    cardBody.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkIn + ', выезд до' + checkOut;
    var liContainer = cardBody.querySelector('.popup__features');
    var li = cardBody.querySelectorAll('.popup__feature');
    for (var l = 0; l < li.length; l++) {
      liContainer.removeChild(li[l]);
    }
    var features = mapTestObject.offer.features;
    for (var j = 0; j < features.length; j++) {
      var newElement = makeElement('li', 'popup__feature', features[j]);
      cardBody.querySelector('.popup__features').appendChild(newElement);
    }
    var cardDescription = mapTestObject.offer.description;
    if (cardDescription !== '') {
      cardBody.querySelector('.popup__description').textContent = cardDescription;
    }
    var cardPhotos = mapTestObject.offer.photos;
    cardBody.querySelector('.popup__photos').removeChild(cardBody.querySelector('.popup__photo'));
    for (var k = 0; k < cardPhotos.length; k++) {
      var newPicture = makeElement('img', 'popup__photo');
      newPicture.setAttribute('src', cardPhotos[k]);
      newPicture.setAttribute('width', 45);
      newPicture.setAttribute('height', 45);
      newPicture.setAttribute('alt', 'Фотография жилья');
      cardBody.querySelector('.popup__photos').appendChild(newPicture);
    }
    return cardBody;
  };
  window.card = {
    renderCard: renderCard
  };
})();
