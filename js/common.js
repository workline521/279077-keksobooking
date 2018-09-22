'use strict';
(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  window.common = {
    getRandomInteger: getRandomInteger
  };
})();
