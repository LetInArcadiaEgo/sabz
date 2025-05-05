import React, { useState } from 'react';
import styles from './Publish.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const Publish = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handlePriceChange = (e) => {
    // Remove any non-digits and existing commas
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setPrice(rawValue);
  };

  const formatNumber = (num) => {
    if (!num) return isEditing ? '' : '0';
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNext = () => {
    navigate('/listing-flow/step3');
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <h1 className={commonStyles.stepTitle}>Now, set your price</h1>
      <p className={commonStyles.stepSubtitle}>
        You can change it anytime.
      </p>

      <div className={styles.content}>
        <div className={styles.priceContainer} onClick={startEditing}>
          <div className={styles.priceWrapper}>
            <span>PKR</span>
            {isEditing ? (
              <input
                type="text"
                value={formatNumber(price)}
                onChange={handlePriceChange}
                onBlur={handleInputBlur}
                autoFocus
                placeholder="0"
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  width: '100%',
                  outline: 'none',
                  textAlign: 'left',
                  minWidth: '120px',
                  maxWidth: '400px',
                }}
              />
            ) : (
              <span className={price ? undefined : styles.placeholder}>
                {formatNumber(price)}
              </span>
            )}
          </div>
          <button 
            className={styles.editButton} 
            onClick={(e) => {
              e.stopPropagation();
              startEditing();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      <NavigationButtons 
        onNext={handleNext}
        disableNext={!price || parseInt(price) <= 0}
      />
    </div>
  );
};

export default Publish; 