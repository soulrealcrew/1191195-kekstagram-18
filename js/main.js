'use strict';

var uploadButton = document.querySelector('#upload-file');
var pictureList = document.querySelector('.pictures');
var filterForm = document.querySelector('.img-filters');

var onSuccessData = function (data) {
  window.util.pictureListData = data;
  window.util.pictureListDataDefault = data;
  window.gallery.showPictureList(data);
  filterForm.classList.remove('img-filters--inactive');
};

var onErrorData = function (errorLog) {
  window.popup.showErrorDataMessage(errorLog);
};


window.backend.download(onSuccessData, onErrorData);
filterForm.addEventListener('click', window.filter.onFilterButtonClick);
pictureList.addEventListener('click', window.fullsize.onClickPreviewPicture);
pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
uploadButton.addEventListener('change', window.edit.openEdit);

