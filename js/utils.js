'use strict';

(function () {
  window.utils = {
    // Функция возврата случайного числа
    randomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    showError: function (message) {
      var templateError = document.querySelector('#error')
                                  .content
                                  .querySelector('.error');
      var newError = templateError.cloneNode(true);
      newError.querySelector('.error__title').textContent = message;
      newError.id = 'errorMessage';
      document.querySelector('main').appendChild(newError);
      window.closeEdit();
      var errorMes = document.querySelector('#errorMessage');
      var deleteError = function () {
        document.querySelector('main').removeChild(errorMes);
      };
      setTimeout(deleteError, 5000);
    },
    showSuccess: function () {
      var templateSuccess = document.querySelector('#success').content.querySelector('.success');
      templateSuccess.id = 'succesMessage';
      document.querySelector('main').appendChild(templateSuccess);

      window.closeEdit();
      var successMes = document.querySelector('#succesMessage');
      var deleteError = function () {
        document.querySelector('main').removeChild(successMes);
      };
      setTimeout(deleteError, 5000);
    }
  };
})();
