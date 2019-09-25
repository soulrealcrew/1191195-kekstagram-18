'use strict';
// Константы
var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;
var PICTURES_COUNT = 25;
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_AUTHOR_NAME = ['Василиса', 'Фатима', 'Лысый', 'Сабрина', 'Вася', 'Ибрагим', 'Бузова', 'M@}{-Ki113r2003', 'Толик', 'Дима', 'Шелдон', 'Тёрк', 'Газаев', 'Бублик', 'Хабиб', 'Захар', 'Гребен', 'Барсик', 'Шарик', 'Тузик', 'Властелин', 'Рыжый', 'Максим', 'Алексей', 'Дмитрий', 'Ахмед', 'Маривана', 'Аркадий', 'Федор', 'Жека', 'Гоша', 'Семён', 'Сизый', 'Екатерина', 'Алиса', 'Карина', 'Смотрящий'];
var MAX_SHOW_COMMENTS = 5;

// Переменные
var templatePicture = document.querySelector('#picture');
var templatePictureItem = templatePicture.content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialComments = bigPicture.querySelector('.social__comments');
var commentElement = socialComments.querySelector('.social__comment');

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
    name: getRandomArrElement(COMMENTS_AUTHOR_NAME),
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
var showBigPicture = function (photo) {
  bigPicture.classList.remove('hidden');
  renderBigPicture(photo);
};

showBigPicture(completedPhotoList[0]);

