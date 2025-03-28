import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoOptionsOutline } from 'react-icons/io5';
import styles from './Search.module.css';

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for properties..."
          className={styles.searchInput}
        />
        <button className={styles.filterButton}>
          <IoOptionsOutline />
        </button>
      </div>
    </div>
  );
};

export default Search; 