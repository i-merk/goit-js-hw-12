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
const perPage = 15;

let currentPage = 1;
let currentQuery = '';
let totalImagesFound = 0;
let totalPages = 0;

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
  totalImagesFound = 0;
  totalPages = 0;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const response = await fetchImages(query, currentPage, perPage);

    if (!response || !response.hits) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from API');
    }

    const images = response.hits;
    totalImagesFound = response.totalHits;
    totalPages = Math.ceil(totalImagesFound / perPage);
    hideLoader();

    if (images.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderImages(images);
    iziToast.success({
      title: 'Success',
      message: `Found ${totalImagesFound} images.`,
    });

    if (currentPage < totalPages) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: `An error occurred while searching for images. Please try again later. Error: ${error.message}`,
    });
    console.error('Error during search:', error);
  }
}

async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(currentQuery, currentPage, perPage);

    if (!response || !response.hits) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from API');
    }

    const images = response.hits;
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
    smoothScroll(); 

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'No More Images',
        message: 'You have reached the end of the search results.',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: `An error occurred while loading more images. Please try again later. Error: ${error.message}`,
    });
    console.error('Error during loading more images:', error);
  }
}

function smoothScroll() {
  const galleryElement = document.querySelector('.gallery');
  if (galleryElement) {
    const { height: cardHeight } = galleryElement.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } else {
    console.error('Element with class .gallery not found.');
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
