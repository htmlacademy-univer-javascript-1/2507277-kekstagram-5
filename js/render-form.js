import { pristine, onInput, inputHashtag, inputComment } from './validation.js';

export const renderForm = () => {
  const fileInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const closeButton = document.querySelector('#upload-cancel');
  const form = document.querySelector('.img-upload__form');

  const closeModal = () => {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    form.reset();
    pristine.reset();
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

  inputHashtag.addEventListener('input', onInput);
  inputComment.addEventListener('input', onInput);
};
