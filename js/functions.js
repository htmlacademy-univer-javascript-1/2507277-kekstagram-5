/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const isMeetingFitWorkingDay = (workStart, workEnd, meetingStart, duration) => {
  const convertToMinutes = (time) => {
    const timeUnitsArray = time.split(':');
    return +timeUnitsArray[0] * 60 + +timeUnitsArray[1];
  };

  return convertToMinutes(meetingStart) >= convertToMinutes(workStart) &&
  convertToMinutes(meetingStart) + duration <= convertToMinutes(workEnd);
};


const isStringMatchesLength = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return normalizedString === reversedString;
};


const searchNumbers = (value) => {
  let analyzingValue = value;
  if(typeof newValue === 'number') {
    analyzingValue = analyzingValue.toString();
  }

  let result = '';
  for(let i = 0; i < analyzingValue.length; i++) {
    const currentChar = analyzingValue[i];
    if (currentChar >= '0' && currentChar <= '9') {
      result += currentChar;
    }
  }

  if (result.length > 0) {
    return Number(result);
  }
  return NaN;
};
