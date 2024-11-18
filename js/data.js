import {getRandomInt, getRandomIDfromRange ,generateOrderedID, getRandomArrayElement} from './util.js';
/* eslint-disable no-console */

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentAuthors = [
  'Дима',
  'Кристина',
  'ВитяOfficial',
  'Колян52',
  'Профессиональный энвилопер:33',
  'ZVZVZV_ГОЙДА',
  'tokyo ghoul',
  'vesta_sport_enjoyer_club',
  'Арматура',
  'AlphaWolf2001',
  'BOSS_OF_THE_GYM',
  'lein iwakura',
];

const photoDescriptions = [
  'Вы только посмотрите, какая милота!',
  'Какой сегодня прекрасный день!',
  'Когда твой кот сам решил стать звездой кекстаграма',
  '+вайб',
  'Мне идет?))',
  'Настроение пошалить (˶ᵔ ᵕ ᵔ˶)',
  'вижу мир иначе',
  'Ставьте лайки, пишите комментарии, подписывайтесь!',
  'Люблю свою жизнь!',
];

const generateCommentId = generateOrderedID();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(comments),
  name: getRandomArrayElement(commentAuthors)
});

const createPhoto = function() {
  const photoIdGenerator = getRandomIDfromRange(1, 25);
  const photoIdPathGenerator = getRandomIDfromRange(1, 25);
  return {
    id: photoIdGenerator(),
    url: `photos/${photoIdPathGenerator()}.jpg`,
    description: getRandomArrayElement(photoDescriptions),
    likes: getRandomInt(15, 200),
    comments: Array.from({length: getRandomInt(0, 30)}, createComment)
  };
};

const createPhotosArray = () => Array.from({length: 25}, createPhoto);
export {createPhotosArray};
