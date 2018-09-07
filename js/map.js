'use strict';

var MAP_TEST = [
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  },
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  },
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  },
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  },
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  },
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  },
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  },
  {
    'author': 'img/avatars/user01.png, img/avatars/user02.png, img/avatars/user03.png, img/avatars/user04.png, img/avatars/user05.png, img/avatars/user06.png, img/avatars/user07.png, img/avatars/user08.png',
    'offer': {
      'title': 'Большая уютная квартира, Маленькая неуютная квартира, Огромный прекрасный дворец, Маленький ужасный дворец, Красивый гостевой домик, Некрасивый негостеприимный домик, Уютное бунгало далеко от моря, Неуютное бунгало по колено в воде',
      'address': window.getRandomInteger(100, 600) + ', ' + window.getRandomInteger(100, 600),
      'price': window.getRandomInteger(1000, 1000000),
      'type': 'palace, flat, house, bungalo',
      'rooms': window.getRandomInteger(1, 5),
      'guests': window.getRandomInteger(1, 10),
      'checkin': '12:00, 13:00, 14:00',
      'checkout': '12:00, 13:00, 14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      x: window.getRandomInteger(40, 1160),
      y: window.getRandomInteger(130, 630)
    }
  }

];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinContainer = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var renderPin = function (testPinArray) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.top = (testPinArray[i]['location']['y'] - 35) + 'px';
  pinElement.style.left = (testPinArray[i]['location']['x'] - 20) + 'px';
  var srcArray = testPinArray[i]['author'].split(', ');
  var altArray = testPinArray[i]['offer']['title'].split(', ');
  pinElement.querySelector('img').src = srcArray[window.getRandomInteger(0, srcArray.length - 1)];
  pinElement.querySelector('img').alt = altArray[window.getRandomInteger(0, altArray.length - 1)];
  return pinElement;
};

for (var i = 0; i <= MAP_TEST.length - 1; i++) {
  fragment.appendChild(renderPin(MAP_TEST));
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
  var cardElement = cardTemplate.cloneNode(true);
  var cardImageSrc = mapTestObject['author'].split(', ');
  cardElement.querySelector('img').src = cardImageSrc[window.getRandomInteger(0, cardImageSrc.length - 1)];
  var cardTitle = mapTestObject['offer']['title'].split(', ');
  cardElement.querySelector('.popup__title').textContent = cardTitle[window.getRandomInteger(0, cardTitle.length - 1)];
  var cardAddress = mapTestObject['offer']['address'];
  cardElement.querySelector('.popup__text--address').textContent = cardAddress;
  var cardPrice = mapTestObject['offer']['price'] + ' ₽/ночь';
  cardElement.querySelector('.popup__text--price').textContent = cardPrice;
  var apartmentsType = mapTestObject['offer']['type'].split(', ');
  var translation = apartmentsType[window.getRandomInteger(0, apartmentsType.length - 1)];
  if (translation === 'palace') {
    translation = 'Дворец';
  } else if (translation === 'flat') {
    translation = 'Квартира';
  } else if (translation === 'house') {
    translation = 'Дом';
  } else if (translation === 'bungalo') {
    translation = 'Бунгало';
  }
  cardElement.querySelector('.popup__type').textContent = translation;
  var roomsNumber = mapTestObject['offer']['rooms'];
  var guestsNumber = mapTestObject['offer']['guests'];
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
  cardElement.querySelector('.popup__text--capacity').textContent = roomsNumber + roomText + guestsNumber + guestText;
  var checkin = mapTestObject['offer']['checkin'].split(', ');
  var checkout = mapTestObject['offer']['checkout'].split(', ');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin[window.getRandomInteger(0, checkin.length - 1)] + ', выезд до' + checkout[window.getRandomInteger(0, checkout.length - 1)];
  var liContainer = cardElement.querySelector('.popup__features');
  var li = cardElement.querySelectorAll('.popup__feature');
  for (var l = 0; l < li.length; l++) {
    liContainer.removeChild(li[l]);
  }
  var features = mapTestObject['offer']['features'];
  for (var j = 0; j <= features.length - 1; j++) {
    var newElement = makeElement('li', 'popup__feature', features[j]);
    cardElement.querySelector('.popup__features').appendChild(newElement);
  }
  var cardDescription = mapTestObject['offer']['description'];
  if (cardDescription !== '') {
    cardElement.querySelector('.popup__description').textContent = cardDescription;
  }
  var cardPhotos = mapTestObject['offer']['photos'];
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
  for (var k = 0; k < cardPhotos.length; k++) {
    var newPicture = makeElement('img', 'popup__photo');
    newPicture.setAttribute('src', cardPhotos[k]);
    newPicture.setAttribute('width', 45);
    newPicture.setAttribute('height', 45);
    newPicture.setAttribute('alt', 'Фотография жилья');
    cardElement.querySelector('.popup__photos').appendChild(newPicture);
  }

  return cardElement;
};
cardContainer.insertBefore(renderCard(MAP_TEST[0], commercialTemplate), insertBeforeThisElement);


