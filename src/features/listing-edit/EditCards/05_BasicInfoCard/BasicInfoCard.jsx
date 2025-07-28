import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import Counter from '../../../../components/common/Counter/Counter';
import styles from './BasicInfoCard.module.css';

const BasicInfoCard = ({
  basicInfo,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempBasicInfo,
  onBasicInfoChange
}) => {
  return (
    <>
      <EditCard
        title="Basic Information"
        content={`${basicInfo.bedrooms} beds · ${basicInfo.bathrooms} baths · ${basicInfo.totalArea} ${basicInfo.areaUnit}`}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={() => onSave('basicInfo', tempBasicInfo || basicInfo)}
        title="Basic Information"
        initialData={basicInfo}
      >
        <div className={styles.modalContent}>
          <div className={styles.counterGroup}>
            <Counter
              label="Bedrooms"
              value={(tempBasicInfo || basicInfo).bedrooms}
              onChange={(value) => onBasicInfoChange({
                ...(tempBasicInfo || basicInfo),
                bedrooms: value
              })}
              minValue={1}
            />
            <Counter
              label="Bathrooms"
              value={(tempBasicInfo || basicInfo).bathrooms}
              onChange={(value) => onBasicInfoChange({
                ...(tempBasicInfo || basicInfo),
                bathrooms: value
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
                value={(tempBasicInfo || basicInfo).totalArea}
                onChange={(e) => onBasicInfoChange({
                  ...(tempBasicInfo || basicInfo),
                  totalArea: parseInt(e.target.value) || 0
                })}
                min="1"
                placeholder="Enter area"
              />
              <select
                className={styles.areaSelect}
                value={(tempBasicInfo || basicInfo).areaUnit}
                onChange={(e) => onBasicInfoChange({
                  ...(tempBasicInfo || basicInfo),
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
      </EditModal>
    </>
  );
};

export default BasicInfoCard; 