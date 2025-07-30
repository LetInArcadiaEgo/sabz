import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import Counter from '../../../../components/common/Counter/Counter';
import styles from './BasicInfoCard.module.css';

const BasicInfoForm = ({ value, onChange }) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.counterGroup}>
        <Counter
          label="Bedrooms"
          value={value?.bedrooms || 1}
          onChange={(bedrooms) => onChange({
            ...value,
            bedrooms
          })}
          minValue={1}
        />
        <Counter
          label="Bathrooms"
          value={value?.bathrooms || 1}
          onChange={(bathrooms) => onChange({
            ...value,
            bathrooms
          })}
          minValue={1}
        />
      </div>

      <div className={styles.areaGroup}>
        <label className={styles.label}>Total Area</label>
        <div className={styles.areaInputs}>
          <input
            type="number"
            className={styles.areaInput}
            value={value?.totalArea || ''}
            onChange={(e) => onChange({
              ...value,
              totalArea: parseInt(e.target.value) || 0
            })}
            min="1"
            placeholder="Enter area"
          />
          <select
            className={styles.areaSelect}
            value={value?.areaUnit || 'Sq Ft'}
            onChange={(e) => onChange({
              ...value,
              areaUnit: e.target.value
            })}
          >
            <option value="Sq Ft">Square Feet</option>
            <option value="Sq M">Square Meters</option>
            <option value="Marla">Marla</option>
            <option value="Kanal">Kanal</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const BasicInfoCard = ({
  bedrooms,
  bathrooms, 
  totalArea,
  areaUnit,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave
}) => {
  const basicInfoData = { bedrooms, bathrooms, totalArea, areaUnit };

  return (
    <>
      <EditCard
        title="Basic Information"
        content={`${bedrooms || 1} beds · ${bathrooms || 1} baths · ${totalArea || ''} ${areaUnit || 'Sq Ft'}`}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={(tempData) => onSave(tempData)}
        title="Basic Information"
        initialData={basicInfoData}
      >
        <BasicInfoForm />
      </EditModal>
    </>
  );
};

export default BasicInfoCard; 