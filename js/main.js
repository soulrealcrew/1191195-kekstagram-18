'use strict';

var uploadButton = window.util.imgUploadForm.querySelector('#upload-file');


window.util.pictureList.appendChild(window.renderPicturesList(window.pictureListData));
window.util.pictureList.addEventListener('click', window.bigPicture.onClickPreviewPicture);
window.util.pictureList.addEventListener('keydown', window.bigPicture.onEnterPreviewPicture);
uploadButton.addEventListener('change', window.openEdit);
