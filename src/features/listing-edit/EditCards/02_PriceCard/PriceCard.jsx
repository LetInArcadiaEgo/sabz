import React, { useState } from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './PriceCard.module.css';

const PriceForm = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatNumber = (num) => {
    if (!num) return isEditing ? '' : '0';
    return num.toLocaleString();
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (rawValue.length <= 14) {
      onChange({
        ...value,
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

  return (
    <div className={styles.priceContainer} onClick={startEditing}>
      <div className={styles.priceWrapper}>
        <span className={styles.currency}>PKR</span>
        <div className={styles.inputContainer}>
          {isEditing ? (
            <input
              type="text"
              value={formatNumber(value?.base || 0)}
              onChange={handlePriceChange}
              onBlur={handleInputBlur}
              autoFocus
              placeholder="0"
              className={styles.priceInput}
              pattern="[0-9]*"
              inputMode="numeric"
            />
          ) : (
            <span className={`${styles.priceText} ${!value?.base ? styles.placeholder : ''}`}>
              {formatNumber(value?.base || 0)}
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
  );
};

const PriceCard = ({
  price,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave
}) => {
  return (
    <>
      <EditCard
        title="Pricing"
        content={`PKR ${price?.base?.toLocaleString() || '0'}`}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={(tempData) => onSave('price', tempData)}
        title="Pricing"
        initialData={price}
      >
        <PriceForm />
      </EditModal>
    </>
  );
};

export default PriceCard; 