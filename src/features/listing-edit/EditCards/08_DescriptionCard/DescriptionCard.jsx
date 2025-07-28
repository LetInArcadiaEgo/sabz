import React, { useState, useEffect, useRef } from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './DescriptionCard.module.css';

const MAX_CHARS = 500;

const DescriptionCard = ({
  description,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempDescription,
  onDescriptionChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  // Trigger editing mode when modal opens
  useEffect(() => {
    setIsEditing(isModalOpen);
    // Place cursor at end when modal opens
    if (isModalOpen) {
      setTimeout(() => {
        if (textareaRef.current) {
          const len = (tempDescription || description || '').length;
          textareaRef.current.setSelectionRange(len, len);
        }
      }, 0);
    }
  }, [isModalOpen]);

  const handleTextareaBlur = () => {
    if (!isModalOpen) setIsEditing(false);
  };

  const handleModalClose = () => {
    // Save changes before closing
    if (typeof tempDescription === 'string') {
      onSave('description', tempDescription);
    }
    onModalClose();
  };

  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      onDescriptionChange(newValue);
    }
  };

  const currentLength = (tempDescription || description || '').length;

  return (
    <>
      <EditCard
        title="Description"
        content={description ? `${description.slice(0, 60)}${description.length > 60 ? '…' : ''}` : ''}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={() => onSave('description', tempDescription || description)}
        title="Description"
        initialData={description}
      >
        <div className={styles.descriptionContainer}>
          <div className={styles.characterCount}>{currentLength}/{MAX_CHARS} characters</div>
          <textarea
            className={styles.textarea}
            value={tempDescription || description}
            onChange={handleDescriptionChange}
            onBlur={handleTextareaBlur}
            placeholder="Write a detailed description of your property"
            maxLength={MAX_CHARS}
            rows={6}
            autoFocus
            ref={textareaRef}
          />
        </div>
      </EditModal>
    </>
  );
};

export default DescriptionCard; 