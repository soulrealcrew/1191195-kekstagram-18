'use strict';
// Модуль сортировки изображений
(function () {
  var filterForm = document.querySelector('.img-filters');

  var sortByDiscussed = function (firstPic, secondPic) {
    var difference = secondPic.comments.length - firstPic.comments.length;

    if (difference === 0) {
      difference = secondPic.likes - firstPic.likes;
    }
    return difference;
  };

  var sortByRandom = function () {
    return Math.random() - 0.5;
  };

  var getSortPictureList = function (evt, data) {
    switch (evt.target.id) {
      case 'filter-random':
        return data.sort(sortByRandom).slice(0, 10);
      case 'filter-discussed':
        return data.sort(sortByDiscussed);
      default:
        return data;
    }
  };

  var getActiveButton = function () {
    return filterForm.querySelector('.img-filters__button--active');
  };

  var changeFilter = window.util.debounce(function (evt) {
    var data = window.util.pictureListDataDefault.slice();
    var sortedPictureList = getSortPictureList(evt, data);
    window.util.pictureListData = sortedPictureList;
    window.gallery.showPictureList(sortedPictureList);
  });

  var onFilterButtonClick = function (evt) {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    getActiveButton().classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    changeFilter(evt);
  };

  window.filter = {
    onFilterButtonClick: onFilterButtonClick,
  };
})();
