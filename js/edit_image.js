'use strict';

// Функция открытия настроек изображения
(function () {
  var ENTER_CODE = 13;
  var ESC_CODE = 27;

  // Форма редактирования изображения
  var formEdit = document.querySelector('.img-upload__form');

  // Input и Label загрузки файла
  var inputUploadFile = formEdit.querySelector('#upload-file');
  var labelUploadFile = formEdit.querySelector('.img-upload__label');

  // Окно редактирования изображения
  var imgUploadOverlay = formEdit.querySelector('.img-upload__overlay');

  // Поле для ошибки
  var errorHash = document.querySelector('#error_hash');

  // Кнопка закрытия окна редактирования и одновременно кнопка сброса
  var btnUploadCancel = formEdit.querySelector('.img-upload__cancel');

  // Поля для хештега и комментариев
  var inputHashtag = formEdit.querySelector('.text__hashtags');
  var inputComment = formEdit.querySelector('.text__description');


  // Закрываем окно по нажатию на ESC, проверяя не находятся ли текстовые поля в фокусе
  var onEscPress = function (escEvt) {
    if ((escEvt.keyCode === ESC_CODE) &&
    (document.activeElement !== inputHashtag) &&
    (document.activeElement !== inputComment)) {
      window.closeEdit();
    }
  };

  // Показываем окно редактирования и запускаем отслеживание нажатия ESC
  var openEdit = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  // Функция для скидывания всех настроек на первоначальные

  // Изображения предпросмотра
  var previewImg = formEdit.querySelector('.img-upload__preview img');
  // Ползунок
  var pin = formEdit.querySelector('.effect-level__pin');
  // Закрашивание прогресса за ползунком
  var pinDepth = formEdit.querySelector('.effect-level__depth');
  // Слайдер
  var slider = formEdit.querySelector('.img-upload__effect-level');
  // Значение увеличения
  var inputScaleValue = formEdit.querySelector('.scale__control--value');

  var onReturnStartOption = function () {
    // Возвращаем исходный размер и значение размера
    previewImg.style.transform = 'scale(' + (1) + ')';
    inputScaleValue.value = 100 + '%';
    window.scaleImage = 100;
    // Ставим ползунок на место
    pin.style.left = 100 + '%';
    pinDepth.style.width = 100 + '%';
    // Удаляем атрибут style у изображения
    previewImg.style.filter = 'brightness(3)';
    // Удаляем слайдеру класс hidden
    slider.classList.remove('hidden');
    // Очищаем классы у изображения и добавляем класс heat
    previewImg.className = '';
    previewImg.classList.add('effects__preview--heat');
  };

  // Закрываем окно редактирования и удаляем отслеживания нажатия ESC
  window.closeEdit = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    errorHash.textContent = '';
    errorHash.style.display = 'none';
    onReturnStartOption();
  };

  // Открываем окно редактирования при загрузке файла
  inputUploadFile.addEventListener('change', function () {
    openEdit();
  });

  // Имитируем клик на input.file при нажатии Enter на значок загрузки файла
  labelUploadFile.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      inputUploadFile.click();
    }
  });

  // Закрываем окно редактирования при клике на кнопке закрытия
  // Еще это одновременно кнопка сбрасывает заполненые поля(type = reset)
  btnUploadCancel.addEventListener('click', function () {
    window.closeEdit();
  });

})();

