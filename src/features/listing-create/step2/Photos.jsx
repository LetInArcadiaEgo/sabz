import React, { useState } from 'react';
import styles from './Photos.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const Photos = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
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
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
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
          disableNext={selectedFiles.length === 0}
        />
      </div>
    </div>
  );
};

export default Photos;
