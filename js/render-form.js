import { pristine, onInput, inputHashtag, inputComment } from './validation.js';
import { resetScale, scaleUp, scaleDown } from './img-scale.js';
import { resetEffects, updateEffect } from './img-effects.js';
import { sendData } from './api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

let isMessageOpen = false;

const showMessage = (templateId, buttonClass) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const messageElement = template.querySelector('section');
  const button = template.querySelector(buttonClass);

  const closeMessage = () => {
    messageElement.remove();
    isMessageOpen = false;
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onClickOutside = (evt) => {
    if (!messageElement.querySelector('div').contains(evt.target)) {
      closeMessage();
    }
  };

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onClickOutside);

  isMessageOpen = true;

  document.body.append(messageElement);
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
  const previewImage = document.querySelector('.img-upload__preview img');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        previewImage.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

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
      if (document.activeElement === inputHashtag ||
        document.activeElement === inputComment) {
        evt.stopPropagation();
      } else if (isMessageOpen) {
        evt.preventDefault();
        document.querySelector('.message__error')?.remove();
        isMessageOpen = false;
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

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();

      sendData(
        new FormData(evt.target),
        () => {
          closeModal();
          showMessage('#success', '.success__button');
          unblockSubmitButton();
        },
        () => {
          showMessage('#error', '.error__button');
          unblockSubmitButton();
        }
      );
    }
  });
};
