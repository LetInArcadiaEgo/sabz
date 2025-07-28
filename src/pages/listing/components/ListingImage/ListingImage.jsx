import React, { useState, useCallback, useEffect } from 'react';
import ShareButton from '../../../../components/common/Button/ShareButton';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ListingImage.module.css';

const MAX_VISIBLE_DOTS = 5;
const DOT_WIDTH = 14; // dot width (8px) + gap (6px)

const ListingImage = ({ images, title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
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

  const imagesArray = images || [images];

  return (
    <div className={styles.imageContainer}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {imagesArray.map((image, index) => (
            <div className={styles.emblaSlide} key={index}>
              <img src={image} alt={`${title} - Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {scrollSnaps.length > 1 && (
        <div className={styles.emblaDots}>
          <div 
            className={styles.emblaDotsContainer}
            style={{ transform: getDotsTransform() }}
          >
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`${styles.emblaDot} ${index === selectedIndex ? styles.emblaDotSelected : ''}`}
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
      )}

      <div className={styles.imageOverlay}>
        <ShareButton className={styles.shareButton} />
      </div>
    </div>
  );
};

export default ListingImage; 