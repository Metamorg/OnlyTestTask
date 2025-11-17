import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import './CircleNavControls.scss';

interface CircleNavControlsProps {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick?: (index: number) => void;
}

export const CircleNavControls: React.FC<CircleNavControlsProps> = ({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onDotClick,
}) => {
  const currentNumber = String(currentIndex + 1).padStart(2, '0');
  const totalNumber = String(total).padStart(2, '0');
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className="circle-nav-controls">
      <p className="circle-nav-controls__counter">
        {currentNumber}/{totalNumber}
      </p>
      <div className="circle-nav-controls__buttons">
        <button
          className={`circle-nav-controls__button ${isFirst ? 'circle-nav-controls__button--disabled' : ''}`}
          onClick={onPrevious}
          disabled={isFirst}
          aria-label="Previous period"
        >
          <ChevronLeftIcon />
        </button>
        <button
          className={`circle-nav-controls__button ${isLast ? 'circle-nav-controls__button--disabled' : ''}`}
          onClick={onNext}
          disabled={isLast}
          aria-label="Next period"
        >
          <ChevronRightIcon />
        </button>
      </div>
      {onDotClick && (
        <div className="circle-nav-controls__dots">
          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              className={`circle-nav-controls__dot ${index === currentIndex ? 'circle-nav-controls__dot--active' : ''}`}
              onClick={() => onDotClick(index)}
              aria-label={`Go to period ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

