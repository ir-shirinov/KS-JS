'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');

  //  Блок показа большого изображения
  var bigPicture = document.querySelector('.big-picture');
  // Блок комментариев
  var ulSocialComment = bigPicture.querySelector('.social__comments');
  // Создаем шаблон
  var liSocialCommentTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);

  // Функция для наполнения комментариями
  var getComment = function (index, cost) {
    // Удаляем все старые комментарии
    while (ulSocialComment.firstChild) {
      ulSocialComment.removeChild(ulSocialComment.firstChild);
    }
    for (var i = 0; i < cost; i++) {
      var liSocialComment = liSocialCommentTemplate.cloneNode(true);
      // Случайный аватар для комментария
      liSocialComment.querySelector('.social__picture').src = 'img/avatar-' + window.utils.randomNumber(1, 6) + '.svg';
      // Комментарий
      liSocialComment.querySelector('.social__text').textContent = window.photos[index].comments[i];
      // Используем фрагмент повторно наполнения его данными;
      fragment.appendChild(liSocialComment);
    }
    // Наполняем блок комментариями
    ulSocialComment.appendChild(fragment);
  };

  // Функция показа большого изображения. Тег зависит от того нажата мышка или Enter(меняется target). Проверяем какая кнопка нажата по id

  var socialLoadmore = bigPicture.querySelector('.social__comments-loader');


  var onOpenImg = function (evt) {
    if (evt.target.id.includes('photoid') || evt.target.id.includes('linkid')) {

      evt.preventDefault();
      // Находим номер фото
      var numberPhoto = evt.target.id.split('-')[1];
      // Отображение блока c большой фотографией и наполнения его данными из сгенерированных фото
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = window.photos[numberPhoto].url;
      bigPicture.querySelector('.likes-count').textContent = window.photos[numberPhoto].likes;
      bigPicture.querySelector('.comments-count').textContent = window.photos[numberPhoto].comments.length;
      if (window.photos[numberPhoto].comments.length < 6) {
        bigPicture.querySelector('#social__comment-min').textContent = window.photos[numberPhoto].comments.length;
      } else {
        bigPicture.querySelector('#social__comment-min').textContent = 5;
      }
      bigPicture.querySelector('.social__caption').textContent = window.photos[numberPhoto].description;

      var costComments = 5;
      if (window.photos[numberPhoto].comments.length < 5) {
        costComments = window.photos[numberPhoto].comments.length;
      }
      getComment(numberPhoto, costComments);
      document.addEventListener('keydown', onEscPress);

      // Прячем блоки счетчиков комментариев и загрузки новых комментариев
      if (window.photos[numberPhoto].comments.length > 5) {
        socialLoadmore.classList.remove('visually-hidden');

        window.newF = function () {
          var numberViewComment = ulSocialComment.childElementCount;
          var maxComment = window.photos[numberPhoto].comments.length;
          if (numberViewComment < maxComment) {
            numberViewComment += 5;

            if (numberViewComment < maxComment) {
              getComment(numberPhoto, numberViewComment);
              bigPicture.querySelector('#social__comment-min').textContent = numberViewComment;
            } else {
              numberViewComment = maxComment;
              getComment(numberPhoto, numberViewComment);
              bigPicture.querySelector('#social__comment-min').textContent = numberViewComment;
              socialLoadmore.classList.add('visually-hidden');
            }
          }
        };


        socialLoadmore.addEventListener('click', window.newF);

      } else {
        socialLoadmore.classList.add('visually-hidden');
      }
    }
  };

  // Закрытие окна
  var onCloseImg = function () {
    bigPicture.classList.add('hidden');
    socialLoadmore.removeEventListener('click', window.newF);
  };

  var ENTER_CODE = 13;
  var ESC_CODE = 27;

  // Текстово поле для ввода комментария
  var inputComment = bigPicture.querySelector('.social__footer-text');

  // Закрываем окно по нажатию на ESC, проверяя не находятся ли текстовые поля в фокусе
  var onEscPress = function (escEvt) {
    if ((escEvt.keyCode === ESC_CODE) && (document.activeElement !== inputComment)) {
      onCloseImg();
    }
  };

  // Обработчик событий на открытие окон с делегированием
  pictures.addEventListener('click', onOpenImg, true);

  // Обработчик событий на открытие окон с делегированием с помощь Enter
  pictures.addEventListener('keydown', function (evtKey) {
    if (evtKey.keyCode === ENTER_CODE) {
      onOpenImg(evtKey);
    }
  }, true);

  // Обработчик событий на закрытие окна мышкой
  var btnClose = bigPicture.querySelector('#picture-cancel');
  btnClose.addEventListener('click', function () {
    onCloseImg();
  });


})();
