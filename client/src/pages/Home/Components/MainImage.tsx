import React from 'react';
import { MainImageProps } from '../../../types/interfaces';

const MainImage: React.FC<MainImageProps> = ({ title, text, image }) => (
  <div className='home__mainImage__wrapper'>
    <img alt='Main movie poster' src={image} className='mainImage' />
    <div className='mainImage-info'>
      <div className='mainImage-info__wrapper'>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  </div>
);

export default MainImage;
