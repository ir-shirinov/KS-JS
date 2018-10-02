'use strict';

(function () {
  // Изменение выводимых изображении при выборе Популярные, Новые, Обсуждаемые


  // Блок с изображениями
  var pictures = document.querySelector('.pictures');
  // Показывае окно с фильтрами
  var filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  // При нажатии "Популярные" выводим все изначальные фотографии
  var popPhoto = filters.querySelector('#filter-popular');
  popPhoto.addEventListener('click', function () {
    // Копируем исходный массив
    window.photos = window.originalPhoto.slice();
    // Удаляем все старые фотографии
    while (pictures.querySelector('a')) {
      pictures.removeChild(pictures.querySelector('a'));
    }
    // Добавляем фотографии
    window.shouPicture(window.photos);
  });

  // При нажатии "Новые" выводим 10 случайных фотографии
  var newPhoto = filters.querySelector('#filter-new');
  newPhoto.addEventListener('click', function () {
    // Копируем исходный массив
    window.photos = window.originalPhoto.slice();
    // Сортируем в случайно порядке
    window.photos.sort(function () {
      return Math.random() - 0.5;
    });
    // Удаляем все старые фотографии
    while (pictures.querySelector('a')) {
      pictures.removeChild(pictures.querySelector('a'));
    }
    // Добавляем 10 новые фотографии
    window.photos = window.photos.splice(0, 10);
    window.shouPicture(window.photos);
  });

  // При нажатии "Обсуждаемые" выводим в порядке убывания комментариев
  var newDiscussion = filters.querySelector('#filter-discussed');
  newDiscussion.addEventListener('click', function () {
    // Копируем исходный массив
    window.photos = window.originalPhoto.slice();
    // Сортируем в случайно порядке
    window.photos.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    // Удаляем все старые фотографии
    while (pictures.querySelector('a')) {
      pictures.removeChild(pictures.querySelector('a'));
    }
    // Добавляем отсортированные фото
    window.shouPicture(window.photos);
  });
})();
