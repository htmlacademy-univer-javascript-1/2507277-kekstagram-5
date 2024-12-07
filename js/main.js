import { createPhotosArray } from './data.js';
import { processThumbnails } from './thumbnails.js';
import { renderForm } from './render-form.js';
const photos = createPhotosArray();
processThumbnails(photos);
renderForm();
