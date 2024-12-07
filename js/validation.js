const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
const submitButton = form.querySelector('.submit-button');

let errorMessage = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const error = () => errorMessage;

const hashTagHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с #',
    },
    {
      check: inputArray.some((item, index, arr) => arr.indexOf(item) !== index),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решетку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`,
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэш-тег не можешь содержать одну решетку',
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const commentHandler = (value) => {
  if (value.length >= MAX_COMMENT_LENGTH) {
    errorMessage = `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`;
    return false;
  }
  return true;
};

pristine.addValidator(inputHashtag, hashTagHandler, error, 1, false);
pristine.addValidator(inputComment, commentHandler, error, 1, false);

const onInput = () => {
  if (pristine.validate()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

export { pristine, onInput, inputHashtag, inputComment };
