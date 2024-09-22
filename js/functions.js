//Функция для проверки длины строки
const isStringMatchesLength = (string, length) => {
  return string.length <= length;
}

//Функция для выявления строк-палиндромов
const isPalindrome = (string) => {
  let normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--)
  {
    reversedString += normalizedString[i];
  }
  return normalizedString === reversedString;
}

//Функция для поиска цифр в строке
const searchNumbers = (string) => {
  //Перестраховка на случай, если передано число
  string = string.toString();

  result = '';
  for(let i = 0; i < string.length; i++) {
    let currentChar = string[i];
    if (currentChar >= '0' && currentChar <= '9') {
      result += currentChar;
    }
  }

  if (result.length > 0) {
    return parseInt(result, 10);
  }
  return NaN;
}

//Тесты
console.log('Тесты функции для проверки длины строки.');
console.log('Ожидается истина. Результат: ' + isStringMatchesLength('проверяемая строка', 20));
console.log('Ожидается истина. Результат: ' + isStringMatchesLength('проверяемая строка', 18));
console.log('Ожидается ложь. Результат: ' + isStringMatchesLength('проверяемая строка', 10));
console.log('.............');

console.log('Тесты функции для нахождения строк-палиндромов.');
console.log('Ожидается истина. Результат: ' + isPalindrome('топот'));
console.log('Ожидается истина. Результат: ' + isPalindrome('ДовОд'));
console.log('Ожидается ложь. Результат: ' + isPalindrome('Кекс'));
console.log('Ожидается истина. Результат: ' + isPalindrome('Лёша на полке клопа нашёл '));
console.log('.............');

console.log('Тесты функции для поиска цифр в строке.');
console.log('Ожидается 2023. Результат: ' + searchNumbers('2023 год'));
console.log('Ожидается 2022. Результат: ' + searchNumbers('ECMAScript 2022'));
console.log('Ожидается 105. Результат: ' + searchNumbers('1 кефир, 0.5 батона'));
console.log('Ожидается 7. Результат: ' + searchNumbers('агент 007'));
console.log('Ожидается NaN. Результат: ' + searchNumbers('а я томат'));
console.log('Ожидается 2023. Результат: ' + searchNumbers(2023));
console.log('Ожидается 1. Результат: ' + searchNumbers(-1));
console.log('Ожидается 15. Результат: ' + searchNumbers(1.5));
