'use strict';

(function () {
  // Форма редактирования изображения
  var formEdit = document.querySelector('.img-upload__form');

  // Изображения предпросмотра
  var previewImg = formEdit.querySelector('.img-upload__preview img');

  // Кнопка увеличения и уменьшения изображения, окно отображения текущего увеличения
  var btnImgSmaller = formEdit.querySelector('.scale__control--smaller');
  var btnImgBigger = formEdit.querySelector('.scale__control--bigger');
  var inputScaleValue = formEdit.querySelector('.scale__control--value');

  // Размер изображения без знака %
  window.scaleImage = inputScaleValue.value.substring(0, inputScaleValue.value.length - 1);

  // Флаг. Если true то увеличиваем, иначе уменьшаем
  var flagTransformBigger;

  // Функция изменения размера
  var transformScaleImg = function (flug) {
    if ((window.scaleImage !== 25) && (!flug)) {
      window.scaleImage -= 25;
    } else if ((window.scaleImage !== 100) && (flug)) {
      window.scaleImage += 25;
    }

    previewImg.style.transform = 'scale(' + (window.scaleImage / 100) + ')';
    inputScaleValue.value = window.scaleImage + '%';
  };

  // Нажатие на кнопку увеличения
  btnImgBigger.addEventListener('click', function () {
    flagTransformBigger = true;
    transformScaleImg(flagTransformBigger);
  });

  // Нажатие на кнопку уменьшения
  btnImgSmaller.addEventListener('click', function () {
    flagTransformBigger = false;
    transformScaleImg(flagTransformBigger);
  });


  // Слайдер
  var slider = formEdit.querySelector('.img-upload__effect-level');
  // Ползунок
  var pin = formEdit.querySelector('.effect-level__pin');
  // Значение ползунка
  var pinValue = formEdit.querySelector('.effect-level__value');
  // Div по которому бегает ползунок
  var pinLine = formEdit.querySelector('.effect-level__line');
  // Закрашивание прогресса за ползунком
  var pinDepth = formEdit.querySelector('.effect-level__depth');
  // Эффекты и отдельно эффект оригинал
  var fieldsetBtnEffects = formEdit.querySelector('.img-upload__effects');
  var effectNone = formEdit.querySelector('#effect-none');


  // Применение эффекта
  var onUseEffect = function () {
    var activeEffectName = fieldsetBtnEffects.querySelector('input:checked').value;
    switch (activeEffectName) {
      case 'chrome' :
        previewImg.style.filter = 'grayscale(' + (pinValue.value / 100) + ')';
        break;
      case 'sepia' :
        previewImg.style.filter = 'sepia(' + (pinValue.value / 100) + ')';
        break;
      case 'marvin' :
        previewImg.style.filter = 'invert(' + pinValue.value + '%)';
        break;
      case 'phobos' :
        previewImg.style.filter = 'blur(' + (pinValue.value / 100 * 3) + 'px)';
        break;
      case 'heat' :
        previewImg.style.filter = 'brightness(' + (pinValue.value / 100 * 2 + 1) + ')';
        break;
    }
  };


  // Движение ползунка
  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // Сколько будет пикселей в 1%
    var onePersent = pinLine.offsetWidth / 100;
    // Начальное положение мыши
    var startX = evt.clientX;
    // Новая позиция ползунка
    var newPosition;


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // Изменение положения
      var shift = Math.round(moveEvt.clientX - startX);
      startX = moveEvt.clientX;

      newPosition = pin.offsetLeft + shift;
      // Проверка, не выходит ли новая позиция за пределы допустимого
      if (newPosition > pinLine.offsetWidth) {
        newPosition = pinLine.offsetWidth;
      }
      if (newPosition < 0) {
        newPosition = 0;
      }

      pin.style.left = newPosition + 'px';
      pinDepth.style.width = newPosition + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // Записываем позицию в значение ползунка в %, только если было движение, иначе ничего не меняем
      if (newPosition !== undefined) {
        pinValue.value = Math.round(newPosition / onePersent);
        onUseEffect();
      }
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  // C помощью делегирования при выборе эффекта скидываем значения ползунка на 100% и скидывыем все эффекты(классы)
  var onChooseEffect = function (evtClick) {
    if (evtClick.target.tagName === 'INPUT') {
      pin.style.left = pinLine.offsetWidth + 'px';
      pinDepth.style.width = pinLine.offsetWidth + 'px';
      previewImg.className = '';
      // Удаляем атрибут style у изображения
      previewImg.style.filter = '';
      // Eсли это не эффект Оригинал
      // 1.Добавляем класс эффекта, чтобы эффект сразу был виден
      // 2.Показываем ползунок
      if (evtClick.target.value !== 'none') {
        slider.classList.remove('hidden');
        previewImg.classList.add('effects__preview--' + evtClick.target.value);
      }
    }
  };

  // Если нажимаем кнопку оригинал, то скрываем слайдер и обнуляем его значения
  effectNone.addEventListener('click', function () {
    slider.classList.add('hidden');
  });

  // Собитыие при выборе эффекта
  fieldsetBtnEffects.addEventListener('click', function (evtC) {
    onChooseEffect(evtC);
  }, true);

})();
