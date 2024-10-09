/* eslint-disable no-console */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomIDfromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);

    if (previousValues.lenght >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateOrderedID = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
export {getRandomInt, getRandomIDfromRange ,generateOrderedID, getRandomArrayElement};
