import React, { useState } from 'react';
import { useListingDraft } from '../../../context/ListingDraftProvider';  
import styles from './Photos.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const Photos = () => {
  const navigate = useNavigate();
  const { draft, setDraft } = useListingDraft();   
  const [selectedFiles, setSelectedFiles] = useState(draft.images || []);
  const [isDragging, setIsDragging] = useState(false);

  /* helper so every change also writes to the shared draft */
  const updateFiles = (nextArr) => {
    setSelectedFiles(nextArr);
    setDraft(d => ({ ...d, images: nextArr }));                              // + NEW
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    updateFiles([...selectedFiles, ...files]);                               // + changed
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files)
                        .filter(f => f.type.startsWith('image/'));
    updateFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    updateFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    navigate('/listing-flow/step-2/title');
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>Add photos of your property</h1>
        <p className={commonStyles.stepSubtitle}>
          Choose at least 5 photos to show buyers your property.
        </p>

        <div className={styles.uploadContainer}>
          <div
            className={`${styles.fileInput} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
              <div>
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                <p>Drag and drop your photos here or click to browse</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Supported formats: JPG, PNG, WEBP</p>
              </div>
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className={styles.selectedFiles}>
              {selectedFiles.map((file, index) => (
                <div key={index} className={styles.fileName}>
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: 'auto',
                      padding: '4px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <NavigationButtons 
          onNext={handleNext}
          onBack={() => navigate('/listing-flow/step-2/intro')}
          disableNext={selectedFiles.length < 5}
        />
      </div>
    </div>
  );
};

export default Photos;
