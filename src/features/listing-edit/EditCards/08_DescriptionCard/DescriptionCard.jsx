import React, { useState, useEffect, useRef } from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './DescriptionCard.module.css';

const MAX_CHARS = 500;

const DescriptionForm = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) {
        const len = (value || '').length;
        textareaRef.current.setSelectionRange(len, len);
      }
    }, 0);
  }, []);

  const handleTextareaBlur = () => {
    setIsEditing(false);
  };

  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      onChange(newValue);
    }
  };

  const currentLength = (value || '').length;

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.characterCount}>
        {currentLength}/{MAX_CHARS} characters
      </div>
      <textarea
        value={value || ''}
        onChange={handleDescriptionChange}
        onBlur={handleTextareaBlur}
        autoFocus
        placeholder="Describe your property in detail..."
        className={styles.textarea}
        maxLength={MAX_CHARS}
        ref={textareaRef}
        rows={8}
      />
    </div>
  );
};

const DescriptionCard = ({
  description,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave
}) => {
  const displayText = description || 'Add description';

  return (
    <>
      <EditCard
        title="Description"
        content={displayText}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={(tempData) => onSave('description', tempData)}
        title="Description"
        initialData={description}
      >
        <DescriptionForm />
      </EditModal>
    </>
  );
};

export default DescriptionCard; 