import React from 'react';
import { Link } from 'react-router-dom';
import { MovieCardsProps } from '../../../types/interfaces';

const MovieCards: React.FC<MovieCardsProps> = ({ movieId, movieName, image }) => (
  <Link to={`/movie/${movieId}`}>
    <img alt={movieName} src={image} />
  </Link>
);

export default MovieCards;
