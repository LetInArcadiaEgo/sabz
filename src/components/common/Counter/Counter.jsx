import React from 'react';
import styles from './Counter.module.css';

const Counter = ({ 
  value, 
  onChange, 
  minValue = 0,
  maxValue = Infinity,
  label
}) => {
  return (
    <div className={styles.counter}>
      {label && <span className={styles.label}>{label}</span>}
      <div style={{ flex: 1 }} />
      <button 
        className={styles.counterButton}
        onClick={() => onChange(value - 1)}
        disabled={value <= minValue}
      >
        −
      </button>
      <span className={styles.counterValue}>{value}</span>
      <button 
        className={styles.counterButton}
        onClick={() => onChange(value + 1)}
        disabled={value >= maxValue}
      >
        +
      </button>
    </div>
  );
};

export default Counter; 