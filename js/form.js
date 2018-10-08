'use strict';
(function () {

  var enableInputs = function (inputsList) {
    inputsList.forEach(function (it) {
      it.disabled = false;
    });
  };
  var disableInputs = function (inputsList) {
    inputsList.forEach(function (it) {
      it.disabled = true;
    });
  };

  var form = document.querySelector('.ad-form');
  var titleInput = document.querySelector('#title');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

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
      priceInput.placeholder = '0';
      priceInput.min = '0';
    } else if (typeInput.value === 'flat') {
      priceInput.placeholder = '1000';
      priceInput.min = '1000';
    } else if (typeInput.value === 'house') {
      priceInput.placeholder = '5000';
      priceInput.min = '5000';
    } else {
      priceInput.placeholder = '10000';
      priceInput.min = '10000';
    }
  });

  timeInInput.addEventListener('change', function () {
    timeOutInput.value = timeInInput.value;
  });
  timeOutInput.addEventListener('change', function () {
    timeInInput.value = timeOutInput.value;
  });

  var onSelectChange = function () {
    var message = '';
    if (+rooms.value < +capacity.value) {
      message = 'Количество гостей не должно превышать количество комнат';
    }
    if ((rooms.value === '100' && capacity.value !== '0') || (rooms.value !== '100' && capacity.value === '0')) {
      message = '100 комнат предназначены не для гостей';
    }
    capacity.setCustomValidity(message);
  };
  form.addEventListener('change', onSelectChange);
  window.form = {
    enableInputs: enableInputs,
    disableInputs: disableInputs
  };
})();
