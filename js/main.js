import { createPhotosArray } from './data.js';
import { processThumbnails } from './thumbnails.js';

const photos = createPhotosArray();
processThumbnails(photos);
