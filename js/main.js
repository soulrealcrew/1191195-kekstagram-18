'use strict';
// Константы
var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;
var PICTURES_COUNT = 25;
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_AUTHOR_NAMES = ['Василиса', 'Фатима', 'Лысый', 'Сабрина', 'Вася', 'Ибрагим', 'Бузова', 'M@}{-Ki113r2003', 'Толик', 'Дима', 'Шелдон', 'Тёрк', 'Газаев', 'Бублик', 'Хабиб', 'Захар', 'Гребен', 'Барсик', 'Шарик', 'Тузик', 'Властелин', 'Рыжый', 'Максим', 'Алексей', 'Дмитрий', 'Ахмед', 'Маривана', 'Аркадий', 'Федор', 'Жека', 'Гоша', 'Семён', 'Сизый', 'Екатерина', 'Алиса', 'Карина', 'Смотрящий'];
var MAX_SHOW_COMMENTS = 5;
var ESC_KEY = 27;
var ENTER_KEY = 13;
var MAX_HASH_LENGTH = 20;
var MAX_HASH_COUNT = 5;
var HASHTAG_SYMBOL = '#';

// Переменные
var templatePicture = document.querySelector('#picture');
var templatePictureItem = templatePicture.content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialComments = bigPicture.querySelector('.social__comments');
var commentElement = socialComments.querySelector('.social__comment');
var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

// Генерация числа в заданном диапазоне, либо от 0 до указанного значения
var getRandomNumber = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  return Math.floor((Math.random() * ((max + 1) - min)) + min);
};

// Получение случайного элемента из массива
var getRandomArrElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Генерируем объект комментария
var getRandomComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(6, 1) + '.svg',
    message: getRandomArrElement(AUTHOR_COMMENTS),
    name: getRandomArrElement(COMMENT_AUTHOR_NAMES),
  };
};

// Генерируем массив с указанным количеством комментариев
var getCommentsData = function (commentsCount) {
  var tempArray = [];
  for (var i = 0; i < commentsCount; i++) {
    tempArray.push(getRandomComment());
  }
  return tempArray;
};


// Маппинг объекта фотографии
var getRandomPictureItem = function (elementNumber) {
  return {
    url: 'photos/' + elementNumber + '.jpg',
    description: 'Описание фотографии',
    likes: getRandomNumber(LIKES_COUNT_MAX, LIKES_COUNT_MIN),
    comments: getCommentsData(getRandomNumber(2, 1)),
  };
};

// Генерация массива из объектов фотографий
var getPicturesList = function (pictureCount) {
  var tempArray = [];
  for (var i = 1; i <= pictureCount; i++) {
    tempArray.push(getRandomPictureItem(i));
  }
  return tempArray;
};

// Рендер DOM элемента на основе объекта
var renderPicture = function (pictureItem) {
  var pictureElement = templatePictureItem.cloneNode(true);
  var pictureElementImg = pictureElement.querySelector('.picture__img');

  pictureElementImg.src = pictureItem.url;
  pictureElementImg.alt = pictureItem.description;
  pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

  return pictureElement;
};

// Заполнение DOM элемента на основе массива
var renderPicturesList = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  return fragment;
};

// Получаем массив с фотографиями и коментариями
var completedPhotoList = getPicturesList(PICTURES_COUNT);

// Финальная отрисовка
pictureList.appendChild(renderPicturesList(completedPhotoList));

// Дополнительное задание
// Собирает DOM элемент одного комментария
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

// Функция показа большой картинки


var getPictureData = function (picturesMap, picture) {
  var pictureUrl = picture.getAttribute('src');
  for (var i = 0; i < picturesMap.length; i++) {
    if (picturesMap[i].url === pictureUrl) {
      return picturesMap[i];
    }
  }
  return '';
};

var showBigPicture = function (picture) {
  var pictureData = getPictureData(completedPhotoList, picture);
  renderBigPicture(pictureData);
  bigPicture.classList.remove('hidden');
  closeBigPictureButton.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onEscButtomClosePicture);
};

var onClickPreviewPicture = function (evt) {
  if (evt.target.src) {
    showBigPicture(evt.target);
  }
};

var onEnterPreviewPicture = function (evt) {
  if (evt.keyCode === ENTER_KEY && evt.target.children[0].src) {
    showBigPicture(evt.target.children[0]);
  }
};

var onCloseBigPicture = function () {
  bigPicture.classList.add('hidden');
  closeBigPictureButton.removeEventListener('click', onCloseBigPicture);
  document.removeEventListener('keydown', onEscButtomClosePicture);
};

var onEscButtomClosePicture = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    onCloseBigPicture();
  }
};

pictureList.addEventListener('click', onClickPreviewPicture);
pictureList.addEventListener('keydown', onEnterPreviewPicture);

// Задание 8
// Обработка загрузки изображения и добавление нужных обработчиков
// Переменные необходимые для работы
var imgUploadForm = document.querySelector('.img-upload__form');
var imgEditOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var uploadButton = imgUploadForm.querySelector('#upload-file');
var closeEditButton = imgUploadForm.querySelector('#upload-cancel');
var effectLevel = imgUploadForm.querySelector('.effect-level');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
var effectLevelCompleteLine = effectLevelLine.querySelector('.effect-level__depth');
var imgPreview = imgEditOverlay.querySelector('.img-upload__preview').children[0];
var imgEffectsList = imgUploadForm.querySelector('.effects__list');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var hashtagInput = imgUploadForm.querySelector('.text__hashtags');
var submitButton = imgUploadForm.querySelector('.img-upload__submit');
var commentInput = imgUploadForm.querySelector('.text__description');
var DEFFAULT_PIN_POSITION = 91;
var DEFFAULT_VALUE = 20;

// Логика загрузки изображения, открытия окна с эффектами и его закрытия
var onEscButtomCloseEdit = function (evt) {
  if (evt.keyCode === ESC_KEY && evt.target !== hashtagInput && evt.target !== commentInput) {
    closeEdit();
  }
};

var closeEdit = function () {
  imgUploadForm.reset();
  imgEditOverlay.classList.add('hidden');
  closeEditButton.removeEventListener('click', closeEdit);
  document.removeEventListener('keydown', onEscButtomCloseEdit);
  effectLevelPin.removeEventListener('mousedown', onPinMouseDown);
  imgEffectsList.removeEventListener('change', onClickEffectPreview);
  submitButton.removeEventListener('click', onClickSubmitButton);
  resetPreview();
};

var openEdit = function () {
  imgEditOverlay.classList.remove('hidden');
  closeEditButton.addEventListener('click', closeEdit);
  document.addEventListener('keydown', onEscButtomCloseEdit);
  effectLevelPin.addEventListener('mousedown', onPinMouseDown);
  imgEffectsList.addEventListener('change', onClickEffectPreview);
  submitButton.addEventListener('click', onClickSubmitButton);
};

uploadButton.addEventListener('change', openEdit);

// Ниже функции получения строки с эффектом, для дальнейшего его присваивания
// Получение данных необходимых для дальнейшей работы выбранного эффекта
var getCheckedEffectData = function () {
  var checkedEffect = imgEffectsList.querySelector('input[name="effect"]:checked').value;

  var effectsMap = {
    'none': {
      'name': '',
      'measures': '',
      'minRange': '',
      'maxRange': '',
    },
    'chrome': {
      'name': 'grayscale',
      'measures': '',
      'minRange': 0,
      'maxRange': 1,
      'class': 'effects__preview--chrome',
    },
    'sepia': {
      'name': 'sepia',
      'measures': '',
      'minRange': 0,
      'maxRange': 1,
      'class': 'effects__preview--sepia',
    },
    'marvin': {
      'name': 'invert',
      'measures': '%',
      'minRange': 0,
      'maxRange': 100,
      'class': 'effects__preview--marvin',
    },
    'phobos': {
      'name': 'blur',
      'measures': 'px',
      'minRange': 0,
      'maxRange': 5,
      'class': 'effects__preview--phobos',
    },
    'heat': {
      'name': 'brightness',
      'measures': '',
      'minRange': 1,
      'maxRange': 3,
      'class': 'effects__preview--heat',
    },
  };
  return effectsMap[checkedEffect];
};

// Вычесляем какое сейчас значение value в инпуте, что-бы на его основе применить необходимый уровень эффекта
var getEffectLevelValue = function () {
  return effectLevel.querySelector('.effect-level__value').value;
};

// Функция которая возрвашает процентное соотношение в заданном диапазоне, необходимом для эффекта
var getEffectLevel = function (percent, min, max) {
  return (((max - min) / 100 * percent) + min);
};

// Функция получения строки эффекта
var getEffect = function (percent, effect) {
  if (effect.name === '') {
    return 'none';
  }
  var value = getEffectLevel(percent, effect.minRange, effect.maxRange);
  return effect.name + '(' + value + effect.measures + ')';
};

// Функция присваивания эффекта
var setEffect = function (percent, effectData, img) {
  img.style.filter = getEffect(percent, effectData);
};

// Функция изменения эффекта при клике на миниатюру
var changePreviewEffect = function () {
  var currentEffect = getCheckedEffectData();
  resetPreview();
  imgPreview.className = currentEffect.class;
  setEffect(getEffectLevelValue(), currentEffect, imgPreview);
};

// Сброс эффектов
var resetPreview = function () {
  effectLevelValue.value = DEFFAULT_VALUE;
  effectLevelPin.style.left = DEFFAULT_PIN_POSITION + 'px';
  effectLevelCompleteLine.style.width = DEFFAULT_PIN_POSITION + 'px';
  setEffect(DEFFAULT_VALUE, getCheckedEffectData(), imgPreview);
};

// Обработчик клика по миниатюре
var onClickEffectPreview = function () {
  changePreviewEffect();
};

// Получение процентного соотношения положения пина, относительно его максимального положения
var getPinPercentPos = function (position, maxValue) {
  return position / maxValue * 100;
};

// Логика работы с пином и изменением эффекта при движении
var onPinMouseDown = function (evt) {
  evt.preventDefault();
  var currentEffect = getCheckedEffectData();
  var startCoord = evt.ClientX;
  var pin = evt.target;
  var line = evt.target.offsetParent;
  var maxValue = line.offsetWidth;

  var onPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = startCoord - moveEvt.clientX;
    startCoord = moveEvt.clientX;

    if (pin.offsetLeft - shift < 0) {
      pin.style.left = 0;
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    } else if (pin.offsetLeft - shift > maxValue) {
      pin.style.left = maxValue + 'px';
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    } else {
      pin.style.left = (pin.offsetLeft - shift) + 'px';
      effectLevelCompleteLine.style.width = pin.offsetLeft + 'px';
    }

    effectLevelValue.value = getPinPercentPos(pin.offsetLeft, maxValue);
    setEffect(effectLevelValue.value, currentEffect, imgPreview);
  };

  var onPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};

// Работа с валидацией хештэгов

var onClickSubmitButton = function () {
  setHashCustomValidity(hashtagInput);
};

var isHashTooLong = function (hash) {
  return hash.length > MAX_HASH_LENGTH;
};

var isHashHasSpace = function (hash) {
  return (hash.indexOf(HASHTAG_SYMBOL, 1) !== -1);
};

var isHashHasTag = function (hash) {
  return hash[0] !== HASHTAG_SYMBOL;
};


var isHashRepeat = function (currentHash, hashIndex, array) {
  return (array.indexOf(currentHash, hashIndex + 1) !== -1);
};

var isHashEmpty = function (hash) {
  return (hash.length === 1 && hash[0] === HASHTAG_SYMBOL);
};

var isTooMuchHash = function (array) {
  return array.length > MAX_HASH_COUNT;
};

var checkHashValidity = function (input) {
  var validity = {
    hashToLong: false,
    hashHasSpace: false,
    hashHasTag: false,
    tooMushHashs: false,
    hashIsRepeat: false,
    hashIsEmpty: false,
  };

  var hashs = input.value.split(' ');

  if (isTooMuchHash(hashs)) {
    validity.tooMushHashs = true;
  }

  for (var hashIndex = 0; hashIndex < hashs.length; hashIndex++) {
    var currentHash = hashs[hashIndex];
    if (isHashTooLong(currentHash)) {
      validity.hashToLong = true;
    }
    if (isHashHasSpace(currentHash)) {
      validity.hashHasSpace = true;
    }

    if (isHashHasTag(currentHash)) {
      validity.hashHasTag = true;
    }

    if (isHashRepeat(currentHash, hashIndex, hashs)) {
      validity.hashIsRepeat = true;
    }
    if (isHashEmpty(currentHash)) {
      validity.hashIsEmpty = true;
    }
  }

  return validity;
};

var setHashCustomValidity = function (input) {
  input.setCustomValidity('');

  var localesMap = {
    hashToLong: 'Длинна одного хэштега не должна превышать 20 символов',
    hashHasSpace: 'Вы забыли пробел между хэштегами',
    hashHasTag: 'Используйте символ "#" для указания хэштега',
    tooMushHashs: 'Максимальное допустимое количество хэштегов не должно превышать 5-ти',
    hashIsRepeat: 'Нельзя использовать два одинаковых хэштега',
    hashIsEmpty: 'У хэштега должно быть название',
  };

  if (input.value !== '') {
    var validity = checkHashValidity(input);

    for (var key in validity) {
      if (validity[key] && localesMap[key]) {
        input.setCustomValidity(localesMap[key]);
      }
    }
  }
};
