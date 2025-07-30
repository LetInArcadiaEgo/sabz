import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <img src="/images/Sabz_Logo_WhiteBG_transparent.png" alt="Sabz Logo" className={styles.navbarLogo} />
        <div className={styles.tagline}>
          Buy and Sell Properties
          <br />
          in Lahore, Pakistan
        </div>
      </div>

    </nav>
  );
};

export default Navbar; 