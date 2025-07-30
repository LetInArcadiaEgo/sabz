import React, { useState, useEffect, useRef } from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './TitleCard.module.css';

const MAX_CHARS = 50;

const TitleForm = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        const len = (value || '').length;
        inputRef.current.setSelectionRange(len, len);
      }
    }, 0);
  }, []);

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      onChange(newValue);
    }
  };

  const currentLength = (value || '').length;

  return (
    <div className={styles.titleContainer}>
      <div className={styles.characterCount}>
        {currentLength}/{MAX_CHARS} available
      </div>
      <div className={styles.titleWrapper}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={value || ''}
            onChange={handleTitleChange}
            onBlur={handleInputBlur}
            autoFocus
            placeholder="Enter listing title"
            className={styles.titleInput}
            maxLength={MAX_CHARS}
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
};

const TitleCard = ({
  title,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave
}) => {
  return (
    <>
      <EditCard
        title="Title"
        content={title}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={(tempData) => onSave('title', tempData)}
        title="Title"
        initialData={title}
      >
        <TitleForm />
      </EditModal>
    </>
  );
};

export default TitleCard; 