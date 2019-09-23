'use strict';
// Константы
var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;
var PICTURES_COUNT = 25;
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_AUTHOR_NAME = ['Василиса', 'Фатима', 'Лысый', 'Сабрина', 'Вася', 'Ибрагим', 'Бузова', 'M@}{-Ki113r2003', 'Толик', 'Дима', 'Шелдон', 'Тёрк', 'Газаев', 'Бублик', 'Хабиб', 'Захар', 'Гребен', 'Барсик', 'Шарик', 'Тузик', 'Властелин', 'Рыжый', 'Максим', 'Алексей', 'Дмитрий', 'Ахмед', 'Маривана', 'Аркадий', 'Федор', 'Жека', 'Гоша', 'Семён', 'Сизый', 'Екатерина', 'Алиса', 'Карина', 'Смотрящий'];

// Переменные
var templatePicture = document.querySelector('#picture');
var templatePictureItem = templatePicture.content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');

// Генерация числа в заданном диапазоне, либо от 0 до указанного значения
var randomNumber = function (max, min) {
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
  var tempObj = {
    avatar: 'img/avatar-' + randomNumber(6, 1) + '.svg',
    message: getRandomArrElement(AUTHOR_COMMENTS),
    name: getRandomArrElement(COMMENT_AUTHOR_NAME),
  };
  return tempObj;
};

// Генерируем массив с указанным количеством комментариев
var getCommentsList = function (commentsCount) {
  var tempArray = [];
  for (var i = 0; i < commentsCount; i++) {
    tempArray.push(getRandomComment());
  }
  return tempArray;
};


// Маппинг объекта фотографии
var getRandomPictureItem = function (imgUrl, description, likesCount, comment) {
  var tempObj = {
    url: imgUrl,
    description: description,
    likes: likesCount,
    comments: comment,
  };
  return tempObj;
};

// Генерация массива из объектов фотографий
var getPictureList = function (pictureCount) {
  var tempArray = [];
  for (var i = 1; i <= pictureCount; i++) {
    var pictureUrl = 'photos/' + i + '.jpg';
    var pictureDiscription = 'Описание фотографии';
    var likesCount = randomNumber(LIKES_COUNT_MAX, LIKES_COUNT_MIN);
    var pictureComments = getCommentsList(randomNumber(2, 1));
    tempArray.push(getRandomPictureItem(pictureUrl, pictureDiscription, likesCount, pictureComments));
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
var renderPictureList = function (photosArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    fragment.appendChild(renderPicture(photosArray[i]));
  }
  return fragment;
};

// Получаем массив с фотографиями и коментариями
var completedPhotoList = getPictureList(PICTURES_COUNT);

// Финальная отрисовка
pictureList.appendChild(renderPictureList(completedPhotoList));
