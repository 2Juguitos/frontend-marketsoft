// src/Modules/Modulo1/Components/PhotoCarousel.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';

import Pollo1 from '../../../Assets/Pollo1.jpg';
import Tendero from '../../../Assets/Tendero.jpg';
import Verduras2 from '../../../Assets/Verduras2.jpg';

const PhotoCarousel = () => {
  const images = [Pollo1, Tendero, Verduras2];

  return (
    <Carousel>
      {images.map((src, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={src}
            alt={`Slide ${index + 1}`}
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PhotoCarousel;

