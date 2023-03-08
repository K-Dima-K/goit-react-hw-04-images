import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',

  params: {
    per_page: 12,
    key: '32198335-9a9b26a5cd264db7fe2daf7b5',
    image_type: 'photo',
    orientation: 'orientation',
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/?&', {
    params: {
      q,
      page,
    },
  });
  return data.hits;
};
