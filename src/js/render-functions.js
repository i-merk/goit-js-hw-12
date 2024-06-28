import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryElement = document.querySelector('.gallery');

export function clearGallery() {
  galleryElement.innerHTML = '';
}
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images) {
  const markup = images.map(image => createImageCardMarkup(image)).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function createImageCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="photo-card">
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${likes}</p>
        <p class="info-item"><b>Views:</b> ${views}</p>
        <p class="info-item"><b>Comments:</b> ${comments}</p>
        <p class="info-item"><b>Downloads:</b> ${downloads}</p>
      </div>
    </div>
  `;
}
