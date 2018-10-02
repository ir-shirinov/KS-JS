'use strict';

(function () {
  // Функция для валидации формы отредактированного приложения


  // Форма отправки отредактированного изображения
  var btnSubmit = document.querySelector('#upload-submit');
  // Поле хештега
  var inputHashtag = document.querySelector('.text__hashtags');
  // Поле для ошибки
  var errorHash = document.querySelector('#error_hash');


  // Проверка на валидацию хештега
  var onSubmitForm = function (evt) {
    var hashtag = inputHashtag.value;

    if (hashtag !== '') {
      // Создаем массив из названий хештегов
      var hashtags = hashtag.split(' ');
      var message1 = '';
      var message2 = '';
      var message3 = '';
      var message4 = '';
      var message5 = '';

      hashtags.sort();
      hashtags.forEach(function (elem, index, arr) {
        if (!elem.startsWith('#')) {
          message1 = 'Хештег не начинается со знака #';
        }

        if (elem.length < 2) {
          message2 = 'Хештег должен состоять минимум из двух символов, включая #';
        }
        if (elem.length > 20) {
          message3 = 'Хештег должен состоять максимум из 20 символов, включая #';
        }

        if (elem.indexOf('#', 1) > 0) {
          message4 = 'Хештеги должны быть разделены пробелами';
        }

        if (arr.length > 1) {
          var nextElem = arr[(index + 1)];
          if ((index + 1) === (arr.length)) {
            nextElem = arr[0];
          }
          if (elem.toLocaleLowerCase() === nextElem.toLocaleLowerCase()) {
            message5 = 'Не должно быть одиннаковых хештегов';
          }
        }
      });

      // Проверка количества хештегов
      if (hashtags.length > 5) {
        var message6 = 'Должно быть не более 5 хештегов';
      }

      // Массив с ошибками
      var message = [];
      if (message1) {
        message.push(message1);
      }
      if (message2) {
        message.push(message2);
      }
      if (message3) {
        message.push(message3);
      }
      if (message4) {
        message.push(message4);
      }
      if (message5) {
        message.push(message5);
      }
      if (message6) {
        message.push(message6);
      }

      // Если есть ошибки, то отменяем отправку формы и выкидываем ошибки
      if (message.length > 0) {
        evt.preventDefault();
        errorHash.textContent = message.join(', ');
        errorHash.style.display = 'block';
      }
    }
  };

  btnSubmit.addEventListener('click', onSubmitForm);

  // Инпут загрузки файла
  var formEdit = document.querySelector('.img-upload__form');

  formEdit.addEventListener('submit', function (evtSubmit) {
    evtSubmit.preventDefault();
    var data = new FormData(formEdit);
    window.backend.load(data);
  });

})();
