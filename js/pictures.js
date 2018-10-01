'use strict';

var makeElement = function (tagName, elementClass, bemModificator) {
  var element = document.createElement(tagName);
  if (elementClass) {
    element.classList.add(elementClass);
  }
  if (bemModificator) {
    element.classList.add(elementClass + '--' + bemModificator);
  }
  return element;
};

var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

var fileChooser = document.querySelector('.ad-form-header__input');
var preview = document.querySelector('.ad-form-header__preview img');
var images = document.querySelector('#images');

fileChooser.addEventListener('change', function () {
  var file = fileChooser.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

images.addEventListener('change', function (evt) {
  var photos = evt.target.files;
  var photoContainer = document.querySelector('.ad-form__photo-container');

  for (var j = 0; j < photos.length; j++) {
    var reader = new FileReader();
    var photo = photos[j];

    reader.addEventListener('load', function (e) {
      var picFile = e.target;
      var div = makeElement('div', 'ad-form__photo');
      var img = makeElement('img');
      img.src = picFile.result;
      img.width = 70;
      img.height = 70;
      div.appendChild(img);
      photoContainer.appendChild(div);
    });

    reader.readAsDataURL(photo);
  }

});
