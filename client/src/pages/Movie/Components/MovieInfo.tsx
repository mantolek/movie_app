import React from 'react';
import { MovieInfoProps } from '../../../types/interfaces/index';

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const {
    original_title,
    release_date,
    revenue,
    runtime,
    vote_average,
    vote_count,
  } = movie;
  return (
    <div className='movieInfo'>
      <div className='movieInfo__element'>
        <span>Title:</span>
        <p>{original_title}</p>
      </div>
      <div className='movieInfo__element'>
        <span>Release date:</span>
        <p>{release_date}</p>
      </div>
      <div className='movieInfo__element'>
        <span>Revenue:</span>
        <p>{revenue}</p>
      </div>
      <div className='movieInfo__element'>
        <span>Time:</span>
        <p>{runtime}</p>
      </div>
      <div className='movieInfo__element'>
        <span>Vote avarage:</span>
        <p>{vote_average}</p>
      </div>
      <div className='movieInfo__element'>
        <span>Votes:</span>
        <p>{vote_count}</p>
      </div>
    </div>
  );
};

export default MovieInfo;
