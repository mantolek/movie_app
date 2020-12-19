import axios from 'axios';
import {
  API_URL,
  API_KEY,
} from '../config/index';

export const setMoviesCall = async (page: number, category: string) => {
  const endpoint = `${API_URL}movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`;
  const { data } = await axios.get(endpoint);
  return data;
};