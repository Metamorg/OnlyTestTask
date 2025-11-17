import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TimePeriod } from '../types';
import { CircleNav } from './CircleNav';
import { CircleNavControls } from './CircleNavControls';
import { EventSlider } from './EventSlider';
import './HistoricalTimeline.scss';

interface HistoricalTimelineProps {
  data: TimePeriod[];
}

export const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayStartYear, setDisplayStartYear] = useState(data[0].startYear);
  const [displayEndYear, setDisplayEndYear] = useState(data[0].endYear);
  const [isMobile, setIsMobile] = useState(false);
  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const animationTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const prevStartYearRef = useRef<number>(data[0].startYear);
  const prevEndYearRef = useRef<number>(data[0].endYear);
  const isFirstMount = useRef<boolean>(true);

  const activePeriod = data[activeIndex];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animateNumber = (
    start: number,
    end: number,
    callback: (value: number) => void,
    duration: number = 600
  ) => {
    const difference = end - start;
    const steps = Math.abs(difference);
    
    if (steps === 0) {
      callback(end);
      return;
    }

    const minStepDuration = 15;
    const calculatedStepDuration = duration / steps;
    const stepDuration = Math.max(minStepDuration, calculatedStepDuration);
    let currentStep = 0;
    const direction = difference > 0 ? 1 : -1;

    const animate = () => {
      if (currentStep <= steps) {
        const currentValue = start + (currentStep * direction);
        callback(currentValue);
        currentStep++;
        
        if (currentStep <= steps) {
          const timeoutId = setTimeout(animate, stepDuration);
          animationTimeoutsRef.current.push(timeoutId);
        }
      }
    };

    animate();
  };

  useEffect(() => {
    const newStartYear = activePeriod.startYear;
    const newEndYear = activePeriod.endYear;

    animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    animationTimeoutsRef.current = [];

    if (isFirstMount.current) {
      setDisplayStartYear(newStartYear);
      setDisplayEndYear(newEndYear);
      prevStartYearRef.current = newStartYear;
      prevEndYearRef.current = newEndYear;
      isFirstMount.current = false;
    } else {
      if (prevStartYearRef.current !== newStartYear || prevEndYearRef.current !== newEndYear) {
        animateNumber(prevStartYearRef.current, newStartYear, (value) => {
          setDisplayStartYear(value);
        }, 500);
        animateNumber(prevEndYearRef.current, newEndYear, (value) => {
          setDisplayEndYear(value);
        }, 500);

        prevStartYearRef.current = newStartYear;
        prevEndYearRef.current = newEndYear;
      }
    }
    
    if (sliderContainerRef.current) {
        gsap.fromTo(sliderContainerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 }
        );
    }

    return () => {
      animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      animationTimeoutsRef.current = [];
    };
  }, [activeIndex, activePeriod.startYear, activePeriod.endYear]);


  const handleSetActiveIndex = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < data.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  if (isMobile) {
    return (
      <div className="historical-timeline historical-timeline--mobile">
        <div className="historical-timeline__content historical-timeline__content--mobile">
          <h1 className="historical-timeline__title historical-timeline__title--mobile">
            Исторические<br />даты
          </h1>
          
          <div className="historical-timeline__years-mobile">
            <div
              ref={startYearRef}
              className="historical-timeline__year-mobile historical-timeline__year-mobile--start"
            >
              {displayStartYear}
            </div>
            <div
              ref={endYearRef}
              className="historical-timeline__year-mobile historical-timeline__year-mobile--end"
            >
              {displayEndYear}
            </div>
          </div>

          <div className="historical-timeline__category-mobile">
            {activePeriod.category}
          </div>

          <div className="historical-timeline__divider-mobile"></div>

          <div className="historical-timeline__slider-container historical-timeline__slider-container--mobile">
            <EventSlider key={activePeriod.id} events={activePeriod.events} isMobile={true} />
          </div>

          <div className="historical-timeline__controls-wrapper historical-timeline__controls-wrapper--mobile">
            <CircleNavControls
              currentIndex={activeIndex}
              total={data.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onDotClick={handleSetActiveIndex}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="historical-timeline">
      <div className="historical-timeline__grid">
        <div className="historical-timeline__grid-col"></div>
        <div className="historical-timeline__grid-col"></div>
      </div>
      <div className="historical-timeline__grid-center-cross">
        <div className="historical-timeline__grid-center-horizontal"></div>
        <div className="historical-timeline__grid-center-vertical"></div>
      </div>
      
      <div className="historical-timeline__content">
        <div className="historical-timeline__title-wrapper">
          <div className="historical-timeline__v-line"></div>
          <h1 className="historical-timeline__title">
            Исторические
            даты
          </h1>
        </div>
        <div className="historical-timeline__main-section-wrapper">
          <div className="historical-timeline__main-section">
            <div className="historical-timeline__circle-block">
              <div className="historical-timeline__circle-nav-wrapper">
                <CircleNav
                  total={data.length}
                  active={activeIndex}
                  setActive={handleSetActiveIndex}
                  category={activePeriod.category}
                />
              </div>
              <div className="historical-timeline__years-in-circle">
                <div
                  ref={startYearRef}
                  className="historical-timeline__year historical-timeline__year--start"
                >
                  {displayStartYear}
                </div>
                <div
                  ref={endYearRef}
                  className="historical-timeline__year historical-timeline__year--end"
                >
                  {displayEndYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="historical-timeline__controls-wrapper">
          <CircleNavControls
            currentIndex={activeIndex}
            total={data.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
        
        <div ref={sliderContainerRef} className="historical-timeline__slider-container">
            <EventSlider key={activePeriod.id} events={activePeriod.events} />
        </div>
      </div>
    </div>
  );
};

