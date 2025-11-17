import React, { useMemo, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import './CircleNav.scss';

interface CircleNavProps {
  total: number;
  active: number;
  setActive: (index: number) => void;
  category: string;
}

const CIRCLE_RADIUS = 265;
const MOBILE_CIRCLE_RADIUS = 130;
const DOT_SIZE_SMALL = 6;
const DOT_SIZE_LARGE = 56;

export const CircleNav: React.FC<CircleNavProps> = ({ total, active, setActive, category }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? MOBILE_CIRCLE_RADIUS : CIRCLE_RADIUS;

  const rotatableContainerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prevActiveRef = useRef<number>(active);

  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / total;

    const startAngle = -Math.PI / 2;
    return Array.from({ length: total }, (_, i) => {
      const angle = startAngle + i * angleStep;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };
    });
  }, [total, radius]);

  const animateDotToState = (index: number, state: 'active' | 'inactive' | 'hover') => {
    const dot = dotRefs.current[index];
    if (!dot) return;
    const visual = dot.querySelector('.circle-nav__dot-visual');
    const label = dot.querySelector('.circle-nav__dot-label');
  
    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: 'circ.out', overwrite: 'auto' } });
  
    if (state === 'active' || state === 'hover') {
      tl.to(visual, {
        width: DOT_SIZE_LARGE,
        height: DOT_SIZE_LARGE,
        backgroundColor: '#f4f5f9',
        border: '1px solid #303E58',
      })
      .to(label, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, "-=0.2");
    } else { 
      tl.to(visual, {
        width: DOT_SIZE_SMALL,
        height: DOT_SIZE_SMALL,
        backgroundColor: '#42567A',
        border: '1px solid transparent',
        ease: 'circ.in'
      })
      .to(label, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      }, "<");
    }
  }

  useLayoutEffect(() => {
    dotRefs.current.forEach((dot, index) => {
      if (!dot) return;
      const visual = dot.querySelector('.circle-nav__dot-visual');
      const label = dot.querySelector('.circle-nav__dot-label');
      
      gsap.set(visual, { width: DOT_SIZE_SMALL, height: DOT_SIZE_SMALL, backgroundColor: '#42567A', border: '1px solid transparent', borderRadius: '50%' });
      gsap.set(label, { opacity: 0, scale: 0.8 });

      if (index === active) {
        animateDotToState(index, 'active');
      }
    });
    prevActiveRef.current = active;
  }, [total, radius]);

  const categoryDisplayRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef<boolean>(true);
  const prevCategoryRef = useRef<string>(category);
  const categoryAnimationRef = useRef<gsap.core.Tween | null>(null);

  const getCategoryPosition = () => {
    const targetAngle = -Math.PI / 6;
    const activePointX = radius * Math.cos(targetAngle);
    const activePointY = radius * Math.sin(targetAngle);
    const offsetX = 10;
    const offsetY = -100;
    return {
      x: activePointX + offsetX,
      y: activePointY + offsetY,
    };
  };

  const categoryPosition = useMemo(() => {
    return getCategoryPosition();
  }, [radius]);

  useLayoutEffect(() => {
    if (categoryDisplayRef.current && isFirstRender.current) {
      gsap.set(categoryDisplayRef.current, { 
        opacity: 0, 
        scale: 0.8
      });
      isFirstRender.current = false;
    }
  }, [radius, total]);

  const isFirstMount = useRef<boolean>(true);

  useEffect(() => {
    if (rotatableContainerRef.current && categoryDisplayRef.current) {
      const angleStep = (2 * Math.PI) / total;
      const startAngle = -Math.PI / 2;
      const offset = total === 6 ? angleStep / 2 : 0;
      const initialActiveDotAngle = startAngle + offset + active * angleStep;
      const targetAngle = -Math.PI / 6;
      const rotation = targetAngle - initialActiveDotAngle;
      const rotationDegrees = rotation * (180 / Math.PI);

      const wasActiveChanged = prevActiveRef.current !== active;
      const wasCategoryChanged = prevCategoryRef.current !== category;
      const isFirstLoad = isFirstMount.current;

      const position = getCategoryPosition();

      if (categoryDisplayRef.current) {
        categoryDisplayRef.current.style.transform = `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`;
      }

      if (isFirstLoad) {
        gsap.set(rotatableContainerRef.current, { rotation: rotationDegrees });
        const labels = gsap.utils.toArray(rotatableContainerRef.current.querySelectorAll('.circle-nav__dot-label'));
        gsap.set(labels, { rotation: -rotationDegrees });
        if (categoryDisplayRef.current) {
          gsap.set(categoryDisplayRef.current, { 
            opacity: 0, 
            scale: 0.8
          });
          setTimeout(() => {
            if (categoryDisplayRef.current) {
              gsap.to(categoryDisplayRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          }, 100);
        }
        animateDotToState(active, 'active');
        isFirstMount.current = false;
        prevActiveRef.current = active;
        prevCategoryRef.current = category;
        return;
      }

      if (wasActiveChanged || wasCategoryChanged) {
        if (categoryAnimationRef.current) {
          categoryAnimationRef.current.kill();
          categoryAnimationRef.current = null;
        }
        gsap.set(categoryDisplayRef.current, { 
          opacity: 0, 
          scale: 0.8
        });
      }

      if (wasActiveChanged) {
        dotRefs.current.forEach((dot, index) => {
          if (dot && index !== active) {
            const label = dot.querySelector('.circle-nav__dot-label');
            if (label) {
              gsap.set(label, { opacity: 0, scale: 0.8 });
            }
            const visual = dot.querySelector('.circle-nav__dot-visual');
            if (visual) {
              gsap.set(visual, { 
                width: DOT_SIZE_SMALL, 
                height: DOT_SIZE_SMALL, 
                backgroundColor: '#42567A', 
                border: '1px solid transparent' 
              });
            }
          }
        });

        gsap.to(rotatableContainerRef.current, { 
          rotation: rotationDegrees, 
          duration: 0.8, 
          ease: 'power2.inOut',
          onComplete: () => {
            if (categoryDisplayRef.current) {
              if (categoryAnimationRef.current) {
                categoryAnimationRef.current.kill();
              }
              categoryAnimationRef.current = gsap.to(categoryDisplayRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
                delay: 0.2,
                onComplete: () => {
                  categoryAnimationRef.current = null;
                }
              });
            }
          }
        });
        
        const labels = gsap.utils.toArray(rotatableContainerRef.current.querySelectorAll('.circle-nav__dot-label'));
        gsap.to(labels, { rotation: -rotationDegrees, duration: 0.8, ease: 'power2.inOut' });
      } else if (wasCategoryChanged) {
        if (categoryDisplayRef.current) {
          if (categoryAnimationRef.current) {
            categoryAnimationRef.current.kill();
          }
          categoryAnimationRef.current = gsap.to(categoryDisplayRef.current, {
            opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
                delay: 0.2,
                onComplete: () => {
              categoryAnimationRef.current = null;
            }
          });
        }
      }

      if (wasActiveChanged) {
        animateDotToState(prevActiveRef.current, 'inactive');
      }
      animateDotToState(active, 'active');
      
      prevActiveRef.current = active;
      prevCategoryRef.current = category;
    }
  }, [active, total, radius, category]);

  const handleMouseEnter = (index: number) => {
    if (index !== active) {
      animateDotToState(index, 'hover');
    }
  };
  const handleMouseLeave = (index: number) => {
    if (index !== active) {
      animateDotToState(index, 'inactive');
    }
  };

  return (
    <div className="circle-nav" style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}>
      <div ref={rotatableContainerRef} className="circle-nav__rotatable">
        <svg
          className="circle-nav__outline"
          width={radius * 2}
          height={radius * 2}
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
        >
          <circle cx="0" cy="0" r={radius - 1} fill="none" stroke="rgba(66, 86, 122, 0.1)" strokeWidth="1" />
        </svg>

        {points.map((point, index) => (
          <button
            key={index}
            ref={el => {dotRefs.current[index] = el}}
            onClick={() => setActive(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="circle-nav__dot-button"
            aria-label={`Go to period ${index + 1}`}
            style={{
              transform: `translate(-50%, -50%) translate(${point.x}px, ${point.y}px)`,
            }}
          >
            <div className="circle-nav__dot-visual">
              <span className="circle-nav__dot-label">
                {index + 1}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div
        ref={categoryDisplayRef}
        className="circle-nav__category-display"
        style={{
          transform: `translate(calc(-50% + ${categoryPosition.x}px), calc(-50% + ${categoryPosition.y}px))`
        }}
      >
        <span className="circle-nav__category-text">{category}</span>
      </div>
    </div>
  );
};

