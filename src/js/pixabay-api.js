// src/js/pixabay-api.js

import axios from 'axios';

const API_KEY = '44654368-4937825c1744fe72f2410636e';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return response.data.hits;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
