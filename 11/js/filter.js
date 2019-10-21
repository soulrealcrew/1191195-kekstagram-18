'use strict';
// Модуль сортировки изображений
(function () {
  var FILTER_RANDOM = 'filter-random';
  var FILTER_DISCUSSED = 'filter-discussed';

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

  var getSortPictureList = function (filterName, data) {
    switch (filterName) {
      case FILTER_RANDOM:
        return data.sort(sortByRandom).slice(0, 10);
      case FILTER_DISCUSSED:
        return data.sort(sortByDiscussed);
      default:
        return data;
    }
  };

  var activeButtonToggle = function (button) {
    var activeButton = filterForm.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  var changeFilter = window.util.debounce(function (evt) {
    var data = window.util.pictureListDataDefault.slice();
    var sortedPictureList = getSortPictureList(evt.target.id, data);
    window.util.pictureListData = sortedPictureList;
    window.gallery.showPictureList(sortedPictureList);
  });

  var onFilterButtonClick = function (evt) {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    activeButtonToggle(evt.target);
    changeFilter(evt);
  };

  window.filter = {
    onFilterButtonClick: onFilterButtonClick,
  };
})();
