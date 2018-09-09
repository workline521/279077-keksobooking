'use strict';

window.getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.randomShuffle = function () {
  return Math.random() - 0.5;
};

window.transformStringToArray = function (string, separator) {
  return string.split(separator);
};


