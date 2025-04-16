import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Quick Links */}
          <div>
            <h3 className={styles.footerHeading}>Sabz</h3>
            <ul className={styles.footerList}>
              <li><a href="/">Home</a></li>
              <li><a href="/properties">Properties</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={styles.footerHeading}>Contact</h3>
            <ul className={styles.footerList}>
              <li>hello@sabzcorp.com</li>
              <li>+92 321 1234567</li>
              <li>Suite 005, The Polo Residence, Lahore, Pakistan</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className={styles.footerHeading}>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>Facebook</a>
              <a href="#" className={styles.socialLink}>Twitter</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} SabzCorp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;