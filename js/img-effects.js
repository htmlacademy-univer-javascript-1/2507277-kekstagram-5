const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectRadios = document.querySelectorAll('.effects__radio');
const previewImage = document.querySelector('.img-upload__preview img');

const effectSettings = {
  none: {range: [0, 0], start: 0, step: 0, filter: null },
  chrome: {range: [0, 1], start: 1, step: 0.1, filter: (value) => `grayscale(${value})`},
  sepia: {range: [0, 1], start: 1, step: 0.1, filter: (value) => `sepia(${value})`},
  marvin: {range: [0, 100], start: 100, step: 1, filter: (value) => `invert(${value}%)`},
  phobos: {range: [0, 3], start: 3, step: 0.1, filter: (value) => `blur(${value}px)`},
  heat: {range: [1, 3], start: 3, step: 0.1, filter: (value) => `brightness(${value})`},
};

noUiSlider.create(effectSlider, {
  start: 1,
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  connect: 'lower',
});

effectLevelContainer.style.display = 'none';

export const updateEffect = (effectName) => {
  const { range, start, step, filter } = effectSettings[effectName];

  if (effectName === 'none') {
    previewImage.style.filter = '';
    effectLevelContainer.style.display = 'none';
  } else {
    effectLevelContainer.style.display = '';
    effectSlider.noUiSlider.updateOptions({
      range: { min: range[0], max: range[1] },
      start,
      step,
    });

    effectSlider.noUiSlider.set(start);
    previewImage.style.filter = filter(start);
    effectLevelValue.value = start;
  }
};

effectRadios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    if (e.target.checked) {
      updateEffect(e.target.value);
    }
  });
});

effectSlider.noUiSlider.on('update', (values) => {
  const currentEffect = document.querySelector('.effects__radio:checked').value;
  const value = values[0];
  effectLevelValue.value = value;

  const filter = effectSettings[currentEffect]?.filter;
  if (filter) {
    previewImage.style.filter = filter(value);
  }
});

const resetEffects = () => {
  document.querySelector('#effect-none').checked = true;
  updateEffect('none');
};

export {effectSlider, resetEffects};
