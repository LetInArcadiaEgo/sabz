import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ExitButton.module.css';

const ExitButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')} 
      className={styles.exitButton}
    >
      Exit
    </button>
  );
};

export default ExitButton; 