import React, { useState } from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './PriceCard.module.css';

const PriceCard = ({
  price,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempPrice,
  onPriceChange
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatNumber = (num) => {
    if (!num) return isEditing ? '' : '0';
    return num.toLocaleString();
  };

  const handlePriceChange = (e) => {
    // Remove any non-digits and existing commas
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    // Limit to 14 digits
    if (rawValue.length <= 14) {
      onPriceChange({
        base: parseInt(rawValue) || 0
      });
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleModalClose = () => {
    // Save changes before closing
    if (tempPrice) {
      onSave('price', tempPrice);
    }
    onModalClose();
  };

  return (
    <>
      <EditCard
        title="Pricing"
        content={`PKR ${price.base.toLocaleString()}`}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={() => onSave('price', tempPrice || price)}
        title="Pricing"
        initialData={price}
      >
        <div className={styles.priceContainer} onClick={startEditing}>
          <div className={styles.priceWrapper}>
            <span className={styles.currency}>PKR</span>
            <div className={styles.inputContainer}>
              {isEditing ? (
                <input
                  type="text"
                  value={formatNumber((tempPrice || price).base)}
                  onChange={handlePriceChange}
                  onBlur={handleInputBlur}
                  autoFocus
                  placeholder="0"
                  className={styles.priceInput}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              ) : (
                <span className={`${styles.priceText} ${!(tempPrice || price).base ? styles.placeholder : ''}`}>
                  {formatNumber((tempPrice || price).base)}
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
      </EditModal>
    </>
  );
};

export default PriceCard; 