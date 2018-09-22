'use strict';

(function () {
  var mapTest = [];
  window.data = {
    mapTest: mapTest
  };
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
    var first = window.common.getRandomInteger(0, pictures.length - 1);
    var second = window.common.getRandomInteger(0, pictures.length - 1);
    var newArray = pictures.slice();
    if (first !== second) {
      newArray[first] = pictures[second];
      newArray[second] = pictures[first];
    } else {
      first = window.common.getRandomInteger(0, pictures.length - 1);
      newArray[first] = pictures[second];
      newArray[second] = pictures[first];
    }
    return newArray;
  };

  var generateCardData = function () {
    var locationX = window.common.getRandomInteger(0, 1150);
    var locationY = window.common.getRandomInteger(130, 630);
    var cardTestData = {
      author: {
        avatar: authorPictures.pop()
      },
      offer: {
        title: titleNames.pop(),
        address: locationX + ', ' + locationY,
        price: window.common.getRandomInteger(1000, 1000000),
        type: apartmentsTypes[window.common.getRandomInteger(0, apartmentsTypes.length - 1)],
        rooms: window.common.getRandomInteger(1, 5),
        guests: window.common.getRandomInteger(1, 10),
        checkin: chekinTimes[window.common.getRandomInteger(0, chekinTimes.length - 1)],
        checkout: chekinTimes[window.common.getRandomInteger(0, chekinTimes.length - 1)],
        features: createRandomFeatures(randomFeatures, availableFeatures, window.common.getRandomInteger(1, 6)),
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
})();
