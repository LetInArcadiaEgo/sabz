import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './BottomNav.module.css';
import useScrollVisibility from '../../../hooks/useScrollVisibility';
import { useAuth } from '../../../context/AuthContext';
import { HiHome } from 'react-icons/hi';
import { MdAddHome, MdPerson } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';

const BottomNav = () => {
    const isVisible = useScrollVisibility();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Hide on listing flow pages
    if (location.pathname.startsWith('/listing-flow')) {
        return null;
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/listing-flow');
    };

    // Check if user is on any auth page
    const isOnAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

    return (
        <nav className={`${styles.nav} ${!isVisible ? styles.hidden : ''} ${user ? styles.fourTabs : styles.threeTabs}`}>
            <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
                <div className={styles.iconContainer}>
                    <HiHome className={styles.icon} />
                </div>
                <span className={styles.label}>Home</span>
            </Link>
            {user && (
                <Link to="/saved" className={`${styles.link} ${location.pathname === '/saved' ? styles.active : ''}`}>
                    <div className={styles.iconContainer}>
                        <FaHeart className={`${styles.icon} ${styles.heartIcon}`} />
                    </div>
                    <span className={styles.label}>Favorites</span>
                </Link>
            )}
            <Link to="/listing-flow" onClick={handleSubmitClick} className={`${styles.link} ${location.pathname === '/listing-flow' ? styles.active : ''}`}>
                <div className={styles.iconContainer}>
                    <MdAddHome className={styles.icon} />
                </div>
                <span className={styles.label}>Submit</span>
            </Link>
            <Link to={user ? "/my-listings" : "/login"} className={`${styles.link} ${(user ? location.pathname === '/my-listings' : (location.pathname === '/login' || isOnAuthPage)) ? styles.active : ''}`}>
                <div className={styles.iconContainer}>
                    <MdPerson className={`${styles.icon} ${styles.profileIcon}`} />
                </div>
                <span className={styles.label}>{user ? 'My Listings' : 'Log in'}</span>
            </Link>
        </nav>
    );
};

export default BottomNav; 