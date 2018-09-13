'use strict';

var mapTest = [];

var authorPictures = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var titleNames = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var apartmentsTypes = ['palace', 'flat', 'house', 'bungalo'];

var chekinTimes = ['12:00', '13:00', '14:00'];

var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var aparmentPictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var randomFeatures = [];

var createRandomFeatures = function (newList, oldList, randomNumber) {
  for (var m = 0; m <= randomNumber; m++) {
    var newFeature = oldList[Math.floor(Math.random() * oldList.length)];
    newList[m] = newFeature;
  }
  return newList.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};

var swapPictures = function (pictures) {
  var first = window.getRandomInteger(0, pictures.length - 1);
  var second = window.getRandomInteger(0, pictures.length - 1);
  var newArray = pictures.slice();
  if (first !== second) {
    newArray[first] = pictures[second];
    newArray[second] = pictures[first];
  } else {
    first = window.getRandomInteger(0, pictures.length - 1);
    newArray[first] = pictures[second];
    newArray[second] = pictures[first];
  }
  return newArray;
};

var generateCardData = function () {
  var locationX = window.getRandomInteger(0, 1150);
  var locationY = window.getRandomInteger(130, 630);
  var cardTestData = {
    author: {
      avatar: authorPictures.pop()
    },
    offer: {
      title: titleNames.pop(),
      address: locationX + ', ' + locationY,
      price: window.getRandomInteger(1000, 1000000),
      type: apartmentsTypes[window.getRandomInteger(0, apartmentsTypes.length - 1)],
      rooms: window.getRandomInteger(1, 5),
      guests: window.getRandomInteger(1, 10),
      checkin: chekinTimes[window.getRandomInteger(0, chekinTimes.length - 1)],
      checkout: chekinTimes[window.getRandomInteger(0, chekinTimes.length - 1)],
      features: createRandomFeatures(randomFeatures, availableFeatures, window.getRandomInteger(1, 6)),
      description: '',
      photos: swapPictures(aparmentPictures)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return cardTestData;
};

for (var index = 0; index < 8; index++) {
  mapTest.push(generateCardData());
}

var map = document.querySelector('.map');

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

for (var i = 0; i < mapTest.length; i++) {
  fragment.appendChild(renderPins(mapTest[i]));

}

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

var addressInput = document.getElementById('address');

var fieldsets = document.getElementsByTagName('fieldset');

var selects = document.getElementsByTagName('select');

var adForm = document.querySelector('.ad-form');

var mainPin = document.querySelector('.map__pin--main');

var disableInputs = function (tagCollection) {
  for (var x = 0; x < tagCollection.length; x++) {
    tagCollection[x].setAttribute('disabled', 'disabled');
  }
};
disableInputs(fieldsets);
disableInputs(selects);

var enableInputs = function (tagList) {
  for (var c = 0; c < tagList.length; c++) {
    tagList[c].removeAttribute('disabled');
  }
};
var getAddress = function (pinElement) {
  var address = pinElement.getAttribute('style').split(' ');
  var locX = parseInt(address[1], 10);
  var locY = parseInt(address[3], 10);
  return (locX + 31) + ',' + (locY + 80);
};

addressInput.setAttribute('value', getAddress(mainPin));

mainPin.addEventListener('mouseup', function () {
  if (map.classList.contains('map--faded')) {
    enableInputs(fieldsets);
    enableInputs(selects);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    pinContainer.appendChild(fragment);
    var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    for (var t = 0; t < mapPins.length; t++) {
      var mapPin = mapPins[t];
      mapPin.setAttribute('data-index', t);
      mapPin.addEventListener('click', showCard);
    }
    map.addEventListener('click', function (evt) {
      var tar = evt.target;
      if (tar.className === 'popup__close') {
        map.removeChild(document.querySelector('article.map__card'));
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27 && map.querySelector('article.map__card')) {
        map.removeChild(document.querySelector('article.map__card'));
      }
    });
  }
});

var showCard = function (evt) {
  var pinIndex;
  if (evt.target.nodeName === 'IMG') {
    pinIndex = evt.target.parentElement.getAttribute('data-index');
  } else {
    pinIndex = evt.target.getAttribute('data-index');
  }
  if (!document.querySelector('article.map__card')) {
    cardContainer.insertBefore(renderCard(mapTest[pinIndex], commercialTemplate), insertBeforeThisElement);
  } else {
    map.removeChild(document.querySelector('article.map__card'));
    cardContainer.insertBefore(renderCard(mapTest[pinIndex], commercialTemplate), insertBeforeThisElement);
  }
};


var titleInput = document.getElementById('title');
var typeInput = document.getElementById('type');
var priceInput = document.getElementById('price');
var timeInInput = document.getElementById('timein');
var timeOutInput = document.getElementById('timeout');

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Имя должно состоять минимум из 30-х символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

typeInput.addEventListener('change', function () {
  if (typeInput.value === 'bungalo') {
    priceInput.setAttribute('placeholder', '0');
    priceInput.setAttribute('min', '0');
  } else if (typeInput.value === 'flat') {
    priceInput.setAttribute('placeholder', '1000');
    priceInput.setAttribute('min', '1000');
  } else if (typeInput.value === 'house') {
    priceInput.setAttribute('placeholder', '5000');
    priceInput.setAttribute('min', '5000');
  } else {
    priceInput.setAttribute('placeholder', '10000');
    priceInput.setAttribute('min', '10000');
  }
});

timeInInput.addEventListener('change', function () {
  timeOutInput.value = timeInInput.value;
});
timeOutInput.addEventListener('change', function () {
  timeInInput.value = timeOutInput.value;
});


