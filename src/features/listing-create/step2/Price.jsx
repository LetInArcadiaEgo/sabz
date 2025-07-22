import React, { useState } from 'react';
import styles from './Price.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
import { useListingDraft } from '../../../context/ListingDraftProvider';

const Price = () => {
  const navigate = useNavigate();
  const { setDraft } = useListingDraft();
  const [price, setPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handlePriceChange = (e) => {
    // Remove any non-digits and existing commas
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    // Limit to 14 digits
    if (rawValue.length <= 14) {
      setPrice(rawValue);
      
      // 💾 store as number OR string in the shared draft
      setDraft(d => ({ ...d, price: rawValue }));
    }
  };

  const formatNumber = (num) => {
    if (!num) return isEditing ? '' : '0';
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNext = () => {
    navigate('/listing-flow/step-2/publish');
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
            <span className={styles.currency}>PKR</span>
            <div className={styles.inputContainer}>
              {isEditing ? (
                <input
                  type="text"
                  value={formatNumber(price)}
                  onChange={handlePriceChange}
                  onBlur={handleInputBlur}
                  autoFocus
                  placeholder="0"
                  className={styles.priceInput}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              ) : (
                <span className={`${styles.priceText} ${!price ? styles.placeholder : ''}`}>
                  {formatNumber(price)}
                </span>
              )}
            </div>
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

export default Price; 