'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelector('#housing-features');

  var removeMapData = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (it) {
      it.remove();
    });
    var allCards = document.querySelectorAll('.map__card');
    allCards.forEach(function (it) {
      it.remove();
    });
  };

  var typeFilter = function (newType) {
    return type.value === 'any' || newType.offer.type === type.value;
  };

  var priceFilter = function (newPrice) {
    switch (price.value) {
      case 'low':
        return newPrice.offer.price < 10000;

      case 'middle':
        return newPrice.offer.price >= 10000 && newPrice.offer.price <= 50000;

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
  var onFilterChange = function () {
    var pinContainer = document.querySelector('.map__pins');
    var sortedPins = window.mapData.filter(typeFilter).filter(priceFilter).filter(guestsFilter).filter(roomsFilter).filter(featuresFilter);
    var fragment = document.createDocumentFragment();
    removeMapData();
    var len = sortedPins.length > 5 ? 5 : sortedPins.length;
    if (len) {
      for (var i = 0; i < len; i++) {
        fragment.appendChild(window.pin.render(sortedPins[i]));
      }
      pinContainer.appendChild(fragment);
      var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
      for (var j = 0; j < len; j++) {
        var mapPin = mapPins[j];
        mapPin.dataset.index = sortedPins[j].id;
        mapPin.addEventListener('click', window.map.showCard);
      }
    }
  };
  filterForm.addEventListener('change', window.debounce(onFilterChange));
  window.filter = {
    removeMapData: removeMapData
  };
})();
