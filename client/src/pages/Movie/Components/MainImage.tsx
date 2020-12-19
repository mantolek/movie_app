import React from 'react';
import { MainImageProps } from '../../../types/interfaces/index';

const MainImage: React.FC<MainImageProps> = ({ title, text, image }) => (
  <div className='movie__mainImage__wrapper'>
    <div className='mainImage-info'>
      <div className='mainImage-info__wrapper'>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
    <img alt='main_image' src={image} className='mainImage' />
  </div>
);

export default MainImage;
