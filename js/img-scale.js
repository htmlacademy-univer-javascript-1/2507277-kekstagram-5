const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const applyScale = (value) => {
  const scale = value / 100;
  imagePreview.style.transform = `scale(${scale})`;
};

const scaleDown = () => {
  let currentValue = parseInt(scaleValue.value.slice(0, -1), 10);
  if (currentValue > 25) {
    currentValue -= 25;
    scaleValue.value = `${currentValue}%`;
    applyScale(currentValue);
  }
};

const scaleUp = () => {
  let currentValue = parseInt(scaleValue.value.slice(0, -1), 10);
  if (currentValue < 100) {
    currentValue += 25;
    scaleValue.value = `${currentValue}%`;
    applyScale(currentValue);
  }
};

export const resetScale = () => {
  scaleValue.value = '100%';
  applyScale(100);
};

export const onScaleUp = (button) => {
  button.addEventListener('click', scaleUp);
};

export const onScaleDown = (button) => {
  button.addEventListener('click', scaleDown);
};
