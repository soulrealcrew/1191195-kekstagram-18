'use strict';

var uploadButton = window.util.imgUploadForm.querySelector('#upload-file');

var onSuccessData = function (data) {
  window.util.pictureListData = data;
  window.util.pictureList.appendChild(window.gallery.renderPicturesList(data));
};

var onErrorData = function (errorLog) {
  window.util.showErrorDataMessage(errorLog);
};


window.network.load('https://js.dump.academy/kekstagram/data', 'GET', onSuccessData, onErrorData);
window.util.pictureList.addEventListener('click', window.fullsize.onClickPreviewPicture);
window.util.pictureList.addEventListener('keydown', window.fullsize.onEnterPreviewPicture);
uploadButton.addEventListener('change', window.edit.openEdit);

