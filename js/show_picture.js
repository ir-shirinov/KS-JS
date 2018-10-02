'use strict';

// Создание DOM элементов и их наполнение фотографиями
(function () {

  window.shouPicture = function (photos) {
    var fragment = document.createDocumentFragment();

    var templatePicture = document.querySelector('#picture')
                                  .content
                                  .querySelector('.picture');

    // Создание дом элементов c изображениями и помещаем их в контейнер
    for (var i = 0; i < photos.length; i++) {
      var photo = templatePicture.cloneNode(true);
      photo.id = 'linkid-' + i;
      photo.querySelector('.picture__img').src = photos[i].url;
      photo.querySelector('.picture__img').id = 'photoid-' + i;
      photo.querySelector('.picture__likes').textContent = photos[i].likes;
      photo.querySelector('.picture__comments').textContent = photos[i].comments.length;
      fragment.appendChild(photo);
    }

    // Передаем содержимое контейнера в section для отображения
    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
  };

  window.backend.save();

})();


