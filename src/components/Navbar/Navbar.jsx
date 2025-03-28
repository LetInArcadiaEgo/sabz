import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <img src="/images/Sabz_Logo_WhiteBG_transparent.png" alt="Sabz Logo" className={styles.navbarLogo} />
      </div>
      <div className={styles.navbarLinks}>
        <a href="/">Home</a>
        <a href="/listings">Listings</a>
        <a href="/submit">Submit Listing</a>
      </div>
    </nav>
  );
};

export default Navbar; 