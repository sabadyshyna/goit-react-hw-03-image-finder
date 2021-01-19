const API_KEY = '19086013-8913d7edb8f4a3e99ae0d2d02';
const BASE_URL = 'https://pixabay.com/api';

async function fetchImages(query, page) {
  const response = await fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return await response.json();
}

const api = {
  fetchImages,
};

export default api;
