import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './BottomNav.module.css';
import useScrollVisibility from '../../../hooks/useScrollVisibility';
import { HiHome } from 'react-icons/hi';
import { MdAddHome, MdPerson } from 'react-icons/md';

const BottomNav = () => {
    const isVisible = useScrollVisibility();
    const location = useLocation();
    const navigate = useNavigate();

    // Hide on listing flow pages
    if (location.pathname.startsWith('/listing-flow')) {
        return null;
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/listing-flow');
    };

    return (
        <nav className={`${styles.nav} ${!isVisible ? styles.hidden : ''}`}>
            <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
                <HiHome className={styles.icon} />
                <span className={styles.label}>Home</span>
            </Link>
            <Link to="/listing-flow" onClick={handleSubmitClick} className={`${styles.link} ${location.pathname === '/listing-flow' ? styles.active : ''}`}>
                <MdAddHome className={styles.icon} />
                <span className={styles.label}>Submit</span>
            </Link>
            <Link to="/my-listings" className={`${styles.link} ${location.pathname === '/my-listings' ? styles.active : ''}`}>
                <MdPerson className={`${styles.icon} ${styles.profileIcon}`} />
                <span className={styles.label}>My Listings</span>
            </Link>
        </nav>
    );
};

export default BottomNav; 