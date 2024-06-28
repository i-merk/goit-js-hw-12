// src/main.js

import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formElement = document.querySelector('.search-form');
const inputElement = document.querySelector('.search-input');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

formElement.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();
  const query = inputElement.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const images = await fetchImages(query, currentPage, perPage);
    hideLoader();

    if (images.length === 0) {
      iziToast.info({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderImages(images);
    iziToast.success({
      title: 'Success',
      message: `Found ${images.length} images.`,
    });

    if (images.length >= perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while searching for images. Please try again later.',
    });
  }
}

async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();

  try {
    const images = await fetchImages(currentQuery, currentPage, perPage);
    hideLoader();

    if (images.length === 0) {
      iziToast.info({
        title: 'End of List',
        message: 'No more images for this search query.',
      });
      hideLoadMoreButton();
      return;
    }

    renderImages(images);

    if (images.length < perPage) {
      hideLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while loading more images. Please try again later.',
    });
  }
}

function showLoader() {
  loader.textContent = 'Loading images, please wait...';
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
  loader.textContent = '';
}

function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}