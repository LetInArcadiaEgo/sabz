import React from 'react';
import styles from './EditCard.module.css';

const EditCard = ({ title, content, onClick }) => {
  return (
    <div className={styles.editCard} onClick={onClick}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardContent}>{content}</p>
    </div>
  );
};

export default EditCard; 