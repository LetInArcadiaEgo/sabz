import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './BottomNav.module.css';
import useScrollVisibility from '../../../hooks/useScrollVisibility';
import { HiHome } from 'react-icons/hi';
import { MdAddHome } from 'react-icons/md';

const BottomNav = () => {
    const isVisible = useScrollVisibility();
    const location = useLocation();
    const navigate = useNavigate();

    // Only show on root path (homepage)
    if (location.pathname !== '/') {
        return null;
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/submit');
    };

    return (
        <nav className={`${styles.nav} ${!isVisible ? styles.hidden : ''}`}>
            <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
                <HiHome className={styles.icon} />
                <span className={styles.label}>Home</span>
            </Link>
            <a href="/submit" onClick={handleSubmitClick} className={`${styles.link} ${location.pathname === '/submit' ? styles.active : ''}`}>
                <MdAddHome className={styles.icon} />
                <span className={styles.label}>Submit</span>
            </a>
        </nav>
    );
};

export default BottomNav; 