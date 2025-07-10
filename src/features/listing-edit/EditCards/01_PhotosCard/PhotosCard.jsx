import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import PhotoManager from '../../../../components/common/PhotoManager/PhotoManager';

const PhotosCard = ({ 
  photos, 
  isModalOpen, 
  onModalOpen, 
  onModalClose, 
  onSave, 
  tempPhotos,
  onPhotosChange 
}) => {
  return (
    <>
      <EditCard
        title="Photos"
        content={`${photos.length} photos`}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={() => onSave('photos', tempPhotos || photos)}
        title="Photos"
        initialData={photos}
      >
        <PhotoManager
          photos={tempPhotos || photos}
          onPhotosChange={onPhotosChange}
        />
      </EditModal>
    </>
  );
};

export default PhotosCard; 