'use strict';
// Модуль отрисовки и показа большого изображения при клики на миниатюру
(function () {
  var MAX_SHOW_COMMENTS = 5;
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
  var commentElement = socialComments.querySelector('.social__comment');

  // Собирает DOM елемент одного комментария
  var getCommentElement = function (comment) {
    var cloneCommentElement = commentElement.cloneNode(true);
    var pictureCommentElementImg = cloneCommentElement.querySelector('.social__picture');

    pictureCommentElementImg.src = comment.avatar;
    pictureCommentElementImg.alt = comment.name;
    cloneCommentElement.querySelector('.social__text').textContent = comment.message;

    return cloneCommentElement;
  };

  // Собирает все DOM-комментарии в один фрагмент для далнейшего рендера
  var getCommentList = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(getCommentElement(comments[i]));
    }
    return fragment;
  };

  // Финальный рендер большой картинки с комментариями
  var renderBigPicture = function (pictureItem) {
    bigPicture.querySelector('.big-picture__img').children[0].src = pictureItem.url;
    bigPicture.querySelector('.likes-count').textContent = pictureItem.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureItem.comments.length;
    socialComments.innerHTML = '';
    socialComments.appendChild(getCommentList(pictureItem.comments));

    if (pictureItem.comments.length <= MAX_SHOW_COMMENTS) {
      bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
      bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    }
  };

  // Работа с показом изображения и обработчиками

  var showBigPicture = function (picture) {
    var pictureIndex = picture.getAttribute('data-index');
    var pictureData = window.data.pictureListData[pictureIndex];
    renderBigPicture(pictureData);
    bigPicture.classList.remove('hidden');
    closeBigPictureButton.addEventListener('click', onCloseBigPicture);
    document.addEventListener('keydown', onEscButtomClosePicture);
  };

  var onCloseBigPicture = function () {
    bigPicture.classList.add('hidden');
    closeBigPictureButton.removeEventListener('click', onCloseBigPicture);
    document.removeEventListener('keydown', onEscButtomClosePicture);
  };

  var onEscButtomClosePicture = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY) {
      onCloseBigPicture();
    }
  };

  window.bigPicture = {

    onClickPreviewPicture: function (evt) {
      if (evt.target.src) {
        showBigPicture(evt.target);
      }
    },

    onEnterPreviewPicture: function (evt) {
      if (evt.keyCode === window.util.ENTER_KEY && evt.target.children[0].src) {
        showBigPicture(evt.target.children[0]);
      }
    },
  };

})();
