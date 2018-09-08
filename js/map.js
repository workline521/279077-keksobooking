'use strict';

var MAP_TEST = [];

var transformStringToArray = function (string, separator) {
  return string.split(separator);
};

var authorPictures = transformStringToArray('img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png', ', ');

var titleName = transformStringToArray('Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде', ', ');

var apartmentsType = transformStringToArray('palace, flat, house, bungalo', ', ');

var chekinTime = transformStringToArray('12:00, 13:00, 14:00', ', ');

var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var aparmentPictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var randomFeatures = [];

var createRandomFeatures = function (newArray, oldArray, randomNumber) {
  for (var m = 0; m < randomNumber; m++) {
    var newFeature = oldArray[Math.floor(Math.random() * oldArray.length)];
    if (newArray[m] !== newFeature) {
      newArray[m] = newFeature;
    }
  }
  return newArray;
};

var createRandomPhoto = function () {
  return Math.random() - 0.5;
};


var generateMapData = function (emptyArray) {
  var cardTestData = {
    author: {
      avatar: authorPictures[window.getRandomInteger(0, authorPictures.length - 1)]
    },
    offer: {
      title: titleName[window.getRandomInteger(0, titleName.length - 1)],
      address: window.getRandomInteger(0, 1150) + ', ' + window.getRandomInteger(130, 630),
      price: window.getRandomInteger(1000, 1000000),
      type: apartmentsType[window.getRandomInteger(0, apartmentsType.length - 1)],
      rooms: window.getRandomInteger(1, 5),
      guests: window.getRandomInteger(1, 10),
      checkin: chekinTime[window.getRandomInteger(0, chekinTime.length - 1)],
      checkout: chekinTime[window.getRandomInteger(0, chekinTime.length - 1)],
      features: createRandomFeatures(randomFeatures, availableFeatures, window.getRandomInteger(1, 5)),
      description: '',
      photos: aparmentPictures.sort(createRandomPhoto)
    },
    location: {
      x: window.getRandomInteger(0, 1150),
      y: window.getRandomInteger(130, 630)
    }
  };
  emptyArray.push(cardTestData);

  return emptyArray;
};

for (var index = 0; index < 8; index++) {
  generateMapData(MAP_TEST);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinContainer = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var renderPins = function (mapTemplate) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.top = mapTemplate.location.y + 'px';
  pinElement.style.left = mapTemplate.location.x + 'px';
  pinElement.querySelector('img').src = mapTemplate.author.avatar;
  pinElement.querySelector('img').alt = mapTemplate.offer.title;
  return pinElement;
};

for (var i = 0; i < MAP_TEST.length; i++) {
  fragment.appendChild(renderPins(MAP_TEST[i]));

}

pinContainer.appendChild(fragment);

var cardContainer = document.querySelector('.map');

var commercialTemplate = document.querySelector('#card').content.querySelector('.map__card');

var insertBeforeThisElement = document.querySelector('.map__filters-container');

var makeElement = function (tagName, elementClass, bemModificator) {
  var element = document.createElement(tagName);
  element.classList.add(elementClass);
  if (bemModificator) {
    element.classList.add(elementClass + '--' + bemModificator);
  }
  return element;
};

var renderCard = function (mapTestObject, cardTemplate) {
  var cardBody = cardTemplate.cloneNode(true);
  cardBody.querySelector('img').src = mapTestObject.author.avatar;
  cardBody.querySelector('.popup__title').textContent = mapTestObject.offer.title;
  cardBody.querySelector('.popup__text--address').textContent = mapTestObject.offer.address;
  cardBody.querySelector('.popup__text--price').textContent = mapTestObject.offer.price + ' ₽/ночь';
  var translation = mapTestObject.offer.type;
  if (translation === 'palace') {
    translation = 'Дворец';
  } else if (translation === 'flat') {
    translation = 'Квартира';
  } else if (translation === 'house') {
    translation = 'Дом';
  } else if (translation === 'bungalo') {
    translation = 'Бунгало';
  }
  cardBody.querySelector('.popup__type').textContent = translation;
  var roomsNumber = mapTestObject.offer.rooms;
  var guestsNumber = mapTestObject.offer.guests;
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
  cardBody.querySelector('.popup__text--capacity').textContent = roomsNumber + roomText + guestsNumber + guestText;
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

cardContainer.insertBefore(renderCard(MAP_TEST[0], commercialTemplate), insertBeforeThisElement);


