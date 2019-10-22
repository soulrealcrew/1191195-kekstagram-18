'use strict';
// Модуль отрисовки и показа большого изображения при клики на миниатюру
(function () {
  var MAX_SHOW_COMMENTS = 5;

  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
  var commentElement = socialComments.querySelector('.social__comment');
  var showCommentsButton = bigPicture.querySelector('.comments-loader');
  var commentsCountBlock = bigPicture.querySelector('.social__comment-count');
  var commentsCountOpened = commentsCountBlock.querySelector('.comments-count-opened');
  var commentsCountMax = commentsCountBlock.querySelector('.comments-count');
  var currentComments = [];


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


  var loadComments = function (comments) {
    var startCommentsCount = socialComments.querySelectorAll('.social__comment').length;
    var commentsPart = comments.slice(startCommentsCount, startCommentsCount + MAX_SHOW_COMMENTS);
    socialComments.appendChild(getCommentList(commentsPart));

    var finishCommentsCount = socialComments.querySelectorAll('.social__comment').length;
    if (finishCommentsCount === comments.length) {
      showCommentsButton.classList.add('hidden');
      showCommentsButton.removeEventListener('click', onLoadCommentsClick);
    }
    commentsCountOpened.textContent = finishCommentsCount;
  };

  var onLoadCommentsClick = function () {
    loadComments(currentComments);
  };


  // Финальный рендер большой картинки с комментариями
  var renderBigPicture = function (pictureItem) {
    bigPicture.querySelector('.big-picture__img').children[0].src = pictureItem.url;
    bigPicture.querySelector('.likes-count').textContent = pictureItem.likes;
    bigPicture.querySelector('.social__caption').textContent = pictureItem.description;
    commentsCountMax.textContent = pictureItem.comments.length;
    socialComments.innerHTML = '';
    showCommentsButton.classList.remove('hidden');
    currentComments = pictureItem.comments;
    loadComments(currentComments);
    showCommentsButton.addEventListener('click', onLoadCommentsClick);
  };

  // Работа с показом изображения и обработчиками

  var showBigPicture = function (picture) {
    var pictureIndex = picture.getAttribute('data-index');
    var pictureData = window.util.pictureListData[pictureIndex];
    renderBigPicture(pictureData);
    bigPicture.classList.remove('hidden');
    window.util.addClickEvent(closeBigPictureButton, onCloseBigPicture);
    window.util.addEscClose(document, onCloseBigPicture);
    window.util.addOutClickEvent(document, onCloseBigPicture, bigPicture);
    document.querySelector('body').classList.add('modal-open');
  };

  var onCloseBigPicture = function () {
    bigPicture.classList.add('hidden');
    showCommentsButton.removeEventListener('click', onLoadCommentsClick);
    document.querySelector('body').classList.remove('modal-open');
  };


  var onClickPreviewPicture = function (evt) {
    if (evt.target.src) {
      showBigPicture(evt.target);
    }
  };

  var onEnterPreviewPicture = function (evt) {
    var image = evt.target.children[0];
    if (evt.keyCode === window.util.ENTER_KEY && image.src) {
      showBigPicture(image);
    }
  };

  window.fullsize = {
    onClickPreviewPicture: onClickPreviewPicture,
    onEnterPreviewPicture: onEnterPreviewPicture,
  };

})();
