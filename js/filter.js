'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelector('#housing-features');

  var removePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }

    var allCards = document.querySelectorAll('.map__card');
    for (var j = 0; j < allCards.length; j++) {
      allCards[j].remove();
    }
  };

  var typeFilter = function (newType) {
    return type.value === 'any' || newType.offer.type === type.value;
  };

  var priceFilter = function (newPrice) {
    switch (price.value) {
      case 'low':
        return newPrice.offer.price < 10000;

      case 'middle':
        return newPrice.offer.price > 10000 && newPrice.offer.price < 50000;

      case 'high':
        return newPrice.offer.price > 50000;

      default:
        return true;
    }
  };

  var guestsFilter = function (newGuests) {
    return (guests.value === newGuests.offer.guests.toString()) || (guests.value === 'any');
  };

  var roomsFilter = function (newRooms) {
    return rooms.value === 'any' || newRooms.offer.rooms.toString() === rooms.value;
  };

  var featuresFilter = function (newFeatures) {
    var checkedElements = features.querySelectorAll('input[type=checkbox]:checked');
    var selectedFeatures = [].map.call(checkedElements, function (item) {
      return item.value;
    });
    return selectedFeatures.every(function (currentFeature) {
      return newFeatures.offer.features.includes(currentFeature);
    });
  };


  var onfilterChange = function () {
    window.debounce(function () {
      var pinContainer = document.querySelector('.map__pins');
      var sortedPins = window.mapData.filter(typeFilter).filter(priceFilter).filter(guestsFilter).filter(roomsFilter).filter(featuresFilter);
      var fragment = document.createDocumentFragment();
      removePins();
      if (sortedPins.length) {
        for (var i = 0; i < sortedPins.length; i++) {
          fragment.appendChild(window.pin.render(sortedPins[i]));
        }
        pinContainer.appendChild(fragment);
        var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
        for (var t = 0; t < mapPins.length; t++) {
          var mapPin = mapPins[t];
          mapPin.dataset.index = t;
          mapPin.addEventListener('click', window.map.showCard);
        }
      }
    });
  };
  filterForm.addEventListener('change', onfilterChange);
})();
