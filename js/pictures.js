'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.ad-form-header__input');
  var preview = document.querySelector('.ad-form-header__preview img');
  var images = document.querySelector('#images');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    if (file) {
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
        var div = window.card.makeElement('div', 'ad-form__photo');
        var img = window.card.makeElement('img');
        img.src = picFile.result;
        img.width = 70;
        img.height = 70;
        div.appendChild(img);
        photoContainer.appendChild(div);
      });

      reader.readAsDataURL(photo);
    }
  });
})();
