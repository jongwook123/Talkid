import React, { useState } from 'react';
import * as S from './style';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const SimpleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'Slide 1',
    'Slide 2',
    'Slide 3',
    'Slide 4',
    'Slide 5',
    'Slide 6',
    'Slide 7',
    // Add more slides here as needed
  ];

  const slidesToShow = 5;
  const totalSlides = slides.length;
  const totalPages = Math.ceil(totalSlides / slidesToShow);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? totalSlides - 1 : prevSlide - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === totalSlides - slidesToShow ? 0 : prevSlide + 1));
  };

  const visibleSlides = slides.slice(
    currentSlide,
    currentSlide + slidesToShow > totalSlides ? undefined : currentSlide + slidesToShow
  );

  return (
    <S.Carousel>
      <S.CarouselButton onClick={prevSlide} disabled={currentSlide === 0}>
        <KeyboardArrowLeftIcon/>
      </S.CarouselButton>
      {visibleSlides.map((slide, index) => (
        <S.CarouselItem key={index}>{slide}</S.CarouselItem>
      ))}
      <S.CarouselButton onClick={nextSlide} disabled={currentSlide + slidesToShow >= totalSlides}>
        <KeyboardArrowRightIcon/>
      </S.CarouselButton>
    </S.Carousel>
  );
};

export default SimpleSlider;
