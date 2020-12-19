import axios from 'axios';
import {
  FAVORITE_SERVER,
  COMMENT_SERVER,
  LIKE_SERVER,
  API_URL,
  API_KEY,
} from '../config/index';

export const setMoviesCall = async (page: number, category: string) => {
  const endpoint = `${API_URL}movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`;
  const { data } = await axios.get(endpoint);
  return data;
};

export const setCastCall = async (movieId: string) => {
  const endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
  const { data } = await axios.get(endpointForCasts);
  return data;
};

export const setMovieInfo = async (movieId: string) => {
  const endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(endpointForMovieInfo);
  return data;
};

export const setFavoriteCall = async (url: string, variables = {}) => {
  const token = localStorage.getItem('userLoggedIn');
  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token || '',
    },
  };

  const { data } = await axios.post(
    `${FAVORITE_SERVER}/${url}`,
    { ...variables },
    config
  );

  return data;
};

export const setCommentCall = async (url: string, variables = {}) => {
  const token = localStorage.getItem('userLoggedIn');
  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token || '',
    },
  };

  const { data } = await axios.post(
    `${COMMENT_SERVER}/${url}`,
    { ...variables },
    config
  );

  return data;
};

export const setLikeCall = async (url: string, ID: string, type: string) => {
  const token = localStorage.getItem('userLoggedIn');
  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token || '',
    },
  };

  let variables: {movieID?: string, commentID?: string} = {}
  if(type === 'movie'){
    variables.movieID = ID
  } else {
    variables.commentID = ID
  }
console.log(variables)
  const { data } = await axios.post(
    `${LIKE_SERVER}/${url}`,
    { ...variables },
    config
  );

  return data;
};
