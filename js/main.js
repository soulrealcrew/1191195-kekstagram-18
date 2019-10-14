'use strict';

var uploadButton = document.querySelector('#upload-file');
var pictureList = document.querySelector('.pictures');

var onSuccessData = function (data) {
  window.util.pictureListData = data;
  pictureList.appendChild(window.gallery.renderPicturesList(data));
};

var onErrorData = function (errorLog) {
  window.util.showErrorDataMessage(errorLog);
};


window.backend.download(onSuccessData, onErrorData);
pictureList.addEventListener('click', window.fullsize.onClickPreviewPicture);
pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
uploadButton.addEventListener('change', window.edit.openEdit);

