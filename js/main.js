/* eslint-disable no-console */

const commentsText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentAuthorsNames = [
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

const photoDescriptionTexts = [
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

const getRandomInteger = function(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIDfromRangeGenerator = function(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.lenght >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

function idGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const formingCommentText = function() {
  const commentPartsCount = getRandomInteger(1, 2);

  if (commentPartsCount === 2) {
    const firstPart = getRandomArrayElement(commentsText);
    const secondPart = getRandomArrayElement(commentsText);

    if (firstPart !== secondPart) {
      return firstPart + secondPart;
    }
    return firstPart;
  }
  return getRandomArrayElement(commentsText);
};

const generateCommentId = idGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: formingCommentText(),
  name: getRandomArrayElement(commentAuthorsNames)
});

const photoComments = Array.from({length: getRandomInteger(0, 30)}, createComment);

const createPhotoDescription = function() {
  const photoIdGenerator = getRandomIDfromRangeGenerator(1, 25);
  const photoIdPathGenerator = getRandomIDfromRangeGenerator(1, 25);
  return {
    id: photoIdGenerator(),
    url: `photos/${photoIdPathGenerator()}.jpg`,
    description: getRandomArrayElement(photoDescriptionTexts),
    likes: getRandomInteger(15, 200),
    comments: photoComments
  };
};

const photosObjects = Array.from({length: 25}, createPhotoDescription);
console.log(photosObjects);
