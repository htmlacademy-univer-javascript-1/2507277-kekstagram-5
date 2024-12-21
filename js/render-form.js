import { pristine, onInput, inputHashtag, inputComment } from './validation.js';
import { resetScale, scaleUp, scaleDown } from './img-scale.js';
import { resetEffects, updateEffect } from './img-effects.js';
import { sendData } from './api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

export const renderForm = () => {
  const fileInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const closeButton = document.querySelector('#upload-cancel');
  const form = document.querySelector('.img-upload__form');
  const scaleUpBtn = document.querySelector('.scale__control--bigger');
  const scaleDownBtn = document.querySelector('.scale__control--smaller');
  const effectRadios = document.querySelectorAll('.effects__radio');
  const submitButton = document.querySelector('.img-upload__submit');

  const closeModal = () => {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    form.reset();
    pristine.reset();
    resetScale();
    resetEffects();
  };

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      overlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  });

  closeButton.addEventListener('click', closeModal);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      if (document.activeElement === inputHashtag || document.activeElement === inputComment) {
        evt.stopPropagation();
      } else {
        evt.preventDefault();
        closeModal();
      }
    }
  });

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        updateEffect(e.target.value);
      }
    });
  });

  inputHashtag.addEventListener('input', onInput);
  inputComment.addEventListener('input', onInput);
  scaleDownBtn.addEventListener('click', scaleDown);
  scaleUpBtn.addEventListener('click', scaleUp);

  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = SubmitButtonText.SENDING;
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = SubmitButtonText.IDLE;
  };

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();

      sendData(new FormData(evt.target), closeModal)
        .finally(unblockSubmitButton);
    }
  });
};
