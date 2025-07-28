import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExitButton.module.css';

const ExitButton = ({ to = '/' }) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(to)} 
      className={styles.exitButton}
    >
      Exit
    </button>
  );
};

export default ExitButton; 