'use strict';
// Модуль генерации массива изображений их данными
(function () {
  var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var COMMENT_AUTHOR_NAMES = ['Василиса', 'Фатима', 'Лысый', 'Сабрина', 'Вася', 'Ибрагим', 'Бузова', 'M@}{-Ki113r2003', 'Толик', 'Дима', 'Шелдон', 'Тёрк', 'Газаев', 'Бублик', 'Хабиб', 'Захар', 'Гребен', 'Барсик', 'Шарик', 'Тузик', 'Властелин', 'Рыжый', 'Максим', 'Алексей', 'Дмитрий', 'Ахмед', 'Маривана', 'Аркадий', 'Федор', 'Жека', 'Гоша', 'Семён', 'Сизый', 'Екатерина', 'Алиса', 'Карина', 'Смотрящий'];
  var LIKES_COUNT_MIN = 15;
  var LIKES_COUNT_MAX = 200;
  var PICTURES_COUNT = 25;

  var getCommentsData = function (commentsCount) {
    var tempArray = [];
    for (var i = 0; i < commentsCount; i++) {
      tempArray.push(getRandomComment());
    }
    return tempArray;
  };

  var getRandomComment = function () {
    return {
      avatar: 'img/avatar-' + window.util.getRandomNumber(6, 1) + '.svg',
      message: window.util.getRandomArrElement(AUTHOR_COMMENTS),
      name: window.util.getRandomArrElement(COMMENT_AUTHOR_NAMES),
    };
  };

  var getRandomPictureItem = function (elementNumber) {
    return {
      url: 'photos/' + elementNumber + '.jpg',
      description: 'Описание фотографии',
      likes: window.util.getRandomNumber(LIKES_COUNT_MAX, LIKES_COUNT_MIN),
      comments: getCommentsData(window.util.getRandomNumber(2, 1)),
    };
  };

  var getPicturesList = function (pictureCount) {
    var tempArray = [];
    for (var i = 1; i <= pictureCount; i++) {
      tempArray.push(getRandomPictureItem(i));
    }
    return tempArray;
  };

  window.data.pictureListData = getPicturesList(PICTURES_COUNT);

})();
