'use strict';
// Модуль отрисовки галлереи на основе входящего объекта с данными
(function () {
  var templatePicture = document.querySelector('#picture');
  var templatePictureItem = templatePicture.content.querySelector('.picture');

  var renderPicture = function (pictureItem, index) {
    var pictureElement = templatePictureItem.cloneNode(true);
    var pictureElementImg = pictureElement.querySelector('.picture__img');

    pictureElementImg.src = pictureItem.url;
    pictureElementImg.alt = pictureItem.description;
    pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;
    pictureElementImg.setAttribute('data-index', index);

    return pictureElement;
  };

  window.renderPicturesList = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    }
    return fragment;
  };

})();

