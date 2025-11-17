import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { HistoricalEvent } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import './EventSlider.scss';

interface EventSliderProps {
  events: HistoricalEvent[];
  isMobile?: boolean;
}

export const EventSlider: React.FC<EventSliderProps> = ({ events, isMobile = false }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={`event-slider ${isMobile ? 'event-slider--mobile' : ''}`}>
      <div className="event-slider__container">
        {!isMobile && (
          <>
            <button
              className={`event-slider__nav-button event-slider__nav-button--left ${isBeginning ? 'event-slider__nav-button--hidden' : ''}`}
              aria-label="Previous slide"
              style={{ display: isBeginning ? 'none' : 'flex' }}
            >
              <ChevronLeftIcon />
            </button>
          </>
        )}
        
        <Swiper
          modules={isMobile ? [FreeMode] : [Navigation, FreeMode]}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 1.2,
            momentumBounce: true,
            momentumVelocityRatio: 0.2,
            minimumVelocity: 0.02,
            sticky: true,
          }}
          watchSlidesProgress={true}
          watchOverflow={true}
          slidesPerView="auto"
          spaceBetween={isMobile ? 25 : 80}
          centeredSlides={false}
          speed={400}
          resistance={true}
          resistanceRatio={0.5}
          threshold={5}
          followFinger={true}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          navigation={!isMobile ? {
            prevEl: '.event-slider__nav-button--left',
            nextEl: '.event-slider__nav-button--right',
          } : undefined}
          onSlideChange={handleSlideChange}
          onInit={handleSlideChange}
          className="event-slider__swiper"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} className="event-slider__slide">
              <div className="event-slider__slide-content">
                <h3 className="event-slider__slide-year">{event.year}</h3>
                <p className="event-slider__slide-description">
                  {event.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {!isMobile && (
          <button
            className={`event-slider__nav-button event-slider__nav-button--right ${isEnd ? 'event-slider__nav-button--hidden' : ''}`}
            aria-label="Next slide"
            style={{ display: isEnd ? 'none' : 'flex' }}
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </div>
  );
};