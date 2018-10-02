'use strict';

(function () {
  // Input загрузки изображения
  var inputUploadFile = document.querySelector('#upload-file');
  // Изображения предпросмотра
  var previewImg = document.querySelector('.img-upload__preview img');
  // Допустимые форматы изображении
  var TYPE_IMAGE = ['gif', 'jpg', 'jpeg', 'png'];

  inputUploadFile.addEventListener('change', function () {
    var file = inputUploadFile.files[0];
    var fileType = file.name.toLowerCase().split('.').pop();

    var matches = TYPE_IMAGE.some(function (it) {
      return it === fileType;
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

})();
