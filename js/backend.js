'use strict';

(function () {
  window.backend = {
    load: function (data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var message;
      var URL = 'https://js.dump.academy/kekstagram';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          window.utils.showSuccess();
        } else {
          message = 'Ошибка ' + xhr.status + '. ' + xhr.statusText;
          window.utils.showError(message);
        }
      });

      xhr.addEventListener('error', function () {
        message = 'Ошибка соединения';
        window.utils.showError(message);
      });

      xhr.addEventListener('timeout', function () {
        message = 'Запрос не успе выполниться за: ' + xhr.timeout + 'мс.';
        window.utils.showError(message);
      });

      xhr.timeout = 10000;

      xhr.open('POST', URL);
      xhr.send(data);
    },

    save: function () {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var message;
      var URL = 'https://js.dump.academy/kekstagram/data';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          window.originalPhoto = xhr.response;
          window.photos = window.originalPhoto.slice();
          window.shouPicture(window.photos);
        } else {
          message = 'Ошибка ' + xhr.status + '. ' + xhr.statusText;
          window.utils.showError(message);
        }
      });

      xhr.addEventListener('error', function () {
        message = 'Ошибка соединения';
        window.utils.showError(message);
      });

      xhr.addEventListener('timeout', function () {
        message = 'Запрос не успе выполниться за: ' + xhr.timeout + 'мс.';
        window.utils.showError(message);
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();

    }
  };
})();
