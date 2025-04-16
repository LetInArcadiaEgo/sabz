import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoOptionsOutline } from 'react-icons/io5';
import styles from './Search.module.css';

const Search = () => {
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1);
      },
      { threshold: [1] }
    );

    if (searchRef.current) {
      observer.observe(searchRef.current);
    }

    return () => {
      if (searchRef.current) {
        observer.unobserve(searchRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={searchRef}
      className={`${styles.searchContainer} ${isSticky ? styles.sticky : ''}`}
    >
      <div className={styles.searchBar}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Start your search"
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default Search;