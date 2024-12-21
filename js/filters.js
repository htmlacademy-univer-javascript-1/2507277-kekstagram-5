import { getData } from './api.js';
import { processThumbnails } from './thumbnails.js';

const imgFiltersBlock = document.querySelector('.img-filters');
const filtersForm = imgFiltersBlock.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');
const photoList = document.querySelector('.pictures');

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function clearThumbnails() {
  const existingThumbnails = photoList.querySelectorAll('.picture');
  existingThumbnails.forEach((thumbnail) => thumbnail.remove());
}

function applyFilter(filter, photos) {
  let filteredPhotos;

  switch (filter) {
    case 'filter-default':
      filteredPhotos = [...photos];
      break;
    case 'filter-random':
      filteredPhotos = [...photos]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      break;
    case 'filter-discussed':
      filteredPhotos = [...photos]
        .sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filteredPhotos = [...photos];
  }

  clearThumbnails();
  processThumbnails(filteredPhotos);
}

let loadedPhotos = [];

export const renderFilterThumbnails = () => {
  const onFilterChange = debounce((evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
      evt.target.classList.add('img-filters__button--active');
      const filter = evt.target.id;
      applyFilter(filter, loadedPhotos);
    }
  }, 500);

  const initFilters = (photos) => {
    loadedPhotos = photos;
    imgFiltersBlock.classList.remove('img-filters--inactive');
    processThumbnails(photos);
  };

  getData(initFilters);

  filtersForm.addEventListener('click', onFilterChange);
};
