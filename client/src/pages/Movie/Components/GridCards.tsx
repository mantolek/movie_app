import React from 'react';
import { IMAGE_BASE_URL } from '../../../config/index';
import { GridCardsProps } from '../../../types/interfaces/index'

const GridCards: React.FC<GridCardsProps> = ({
  image, name,
}) => {
  const POSTER_SIZE = 'w154';

  return (
    <div className='gridCards'>
      <img alt={name} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
      <p>{name}</p>
    </div>
  );
}

export default GridCards;
