import React, { useState } from 'react';
import styles from './ListingDescription.module.css';

const ListingDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(description?.split(' ').length > 70);

  return (
    <div className={styles.aboutSection}>
      <h2>About this place</h2>
      <p>
        {description?.split(' ').slice(0, isExpanded ? undefined : 70).join(' ')}
        {description?.split(' ').length > 70 && !isExpanded && '...'}
      </p>
      {description?.split(' ').length > 70 && (
        <button 
          className={styles.showMoreButton}
          onClick={() => {
            setIsExpanded(!isExpanded);
            setHasMore(description?.split(' ').length > 70);
          }}
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        </button>
      )}
    </div>
  );
};

export default ListingDescription; 