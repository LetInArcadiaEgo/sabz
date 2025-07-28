import React, { useState, useEffect, useRef } from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './TitleCard.module.css';

const MAX_CHARS = 50;

const TitleCard = ({
  title,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempTitle,
  onTitleChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  // Start editing mode when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setIsEditing(true);
      // place caret at end of text once input is rendered
      setTimeout(() => {
        if (inputRef.current) {
          const len = (tempTitle || title || '').length;
          inputRef.current.setSelectionRange(len, len);
        }
      }, 0);
    } else {
      setIsEditing(false);
    }
  }, [isModalOpen]);

  const handleInputBlur = () => {
    // Don't stop editing mode on blur while modal is open
    if (!isModalOpen) {
      setIsEditing(false);
    }
  };

  const handleModalClose = () => {
    // Save changes before closing
    if (tempTitle) {
      onSave('title', tempTitle);
    }
    onModalClose();
  };

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      onTitleChange(newValue);
    }
  };

  const currentLength = (tempTitle || title || '').length;

  return (
    <>
      <EditCard
        title="Title"
        content={title}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={() => onSave('title', tempTitle || title)}
        title="Title"
        initialData={title}
      >
        <div className={styles.titleContainer}>
          <div className={styles.characterCount}>
            {currentLength}/{MAX_CHARS} available
          </div>
          <div className={styles.titleWrapper}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={tempTitle || title}
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
      </EditModal>
    </>
  );
};

export default TitleCard; 