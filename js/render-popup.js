import { renderPopupComments } from './render-popup-comments.js';

const closePopup = (modal) => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export const renderPopup = (photo) => {
  const popupModal = document.querySelector('.big-picture');
  const popupImage = popupModal.querySelector('.big-picture__img img');
  const popupCaption = popupModal.querySelector('.social__caption');
  const popupLikesCount = popupModal.querySelector('.likes-count');
  const popupCommentsCount = popupModal.querySelector('.comments-count');

  popupImage.src = photo.url;
  popupImage.alt = photo.description;
  popupCaption.textContent = photo.description;
  popupLikesCount.textContent = photo.likes;
  popupCommentsCount.textContent = photo.comments.length;

  renderPopupComments(photo);

  popupModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const closeButton = popupModal.querySelector('#picture-cancel');
  closeButton.addEventListener('click', () => {
    closePopup(popupModal);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup(popupModal);
    }
  });
};
