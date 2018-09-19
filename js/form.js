'use strict';
(function () {

  var disableInputs = function (tagCollection) {
    for (var x = 0; x < tagCollection.length; x++) {
      tagCollection[x].disabled = 'disabled';
    }
  };
  var enableInputs = function (tagList) {
    for (var c = 0; c < tagList.length; c++) {
      tagList[c].disabled = '';
    }
  };
  window.form = {
    disableInputs: disableInputs,
    enableInputs: enableInputs
  };
  var form = document.querySelector('.ad-form');
  var titleInput = document.getElementById('title');
  var typeInput = document.getElementById('type');
  var priceInput = document.getElementById('price');
  var timeInInput = document.getElementById('timein');
  var timeOutInput = document.getElementById('timeout');
  var rooms = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');

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
    if (capacity.value === '0' && rooms.value === '100') {
      capacity.setCustomValidity('');
      rooms.setCustomValidity('');
    } else if (rooms.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Такое количество комнат не для гостей');
    } else if (capacity.value === '0' && rooms.value !== '100') {
      rooms.setCustomValidity('Не для гостей только 100 комнат');
    } else if (rooms.value >= capacity.value) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('В каждой комнате максимум по одному гостю');
    }
  };
  form.addEventListener('change', onSelectChange);
})();
