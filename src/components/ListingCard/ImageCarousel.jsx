import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './ImageCarousel.css';

const MAX_VISIBLE_DOTS = 5;
const DOT_WIDTH = 14; // dot width (8px) + gap (6px)

const ImageCarousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const getDotVisibility = (index, totalDots) => {
    if (totalDots <= MAX_VISIBLE_DOTS) return true;

    if (selectedIndex <= 2) {
      return index < MAX_VISIBLE_DOTS;
    }
    if (selectedIndex >= totalDots - 3) {
      return index >= totalDots - MAX_VISIBLE_DOTS;
    }
    return index >= selectedIndex - 2 && index <= selectedIndex + 2;
  };

  const getDotsTransform = () => {
    const totalDots = scrollSnaps.length;
    if (totalDots <= MAX_VISIBLE_DOTS) return 0;

    let offset = 0;
    if (selectedIndex <= 2) {
      offset = 0;
    } else if (selectedIndex >= totalDots - 3) {
      offset = totalDots - MAX_VISIBLE_DOTS;
    } else {
      offset = selectedIndex - 2;
    }
    
    return `translateX(calc(50% - ${DOT_WIDTH}px + ${offset * -DOT_WIDTH}px))`;
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <img 
                src={image} 
                alt={`Property view ${index + 1}`}
                className="embla__slide__img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="embla__dots">
        <div 
          className="embla__dots-container"
          style={{ transform: getDotsTransform() }}
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
              style={{
                opacity: getDotVisibility(index, scrollSnaps.length) ? 1 : 0,
                pointerEvents: getDotVisibility(index, scrollSnaps.length) ? 'auto' : 'none'
              }}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;