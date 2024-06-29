// src/js/pixabay-api.js

import axios from 'axios';

const API_KEY = '44654368-4937825c1744fe72f2410636e';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    console.log('API response:', response.data);

    if (response.status !== 200) {
      throw new Error('Error fetching data from API');
    }

    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}
