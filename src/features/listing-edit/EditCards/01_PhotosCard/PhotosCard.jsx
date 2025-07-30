import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import PhotoManager from '../../../../components/common/PhotoManager/PhotoManager';

const PhotosForm = ({ value, onChange }) => {
  return (
    <PhotoManager
      photos={value || []}
      onPhotosChange={onChange}
    />
  );
};

const PhotosCard = ({ 
  photos, 
  isModalOpen, 
  onModalOpen, 
  onModalClose, 
  onSave
}) => {
  return (
    <>
      <EditCard
        title="Photos"
        content={`${photos?.length || 0} photos`}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={(tempData) => onSave('photos', tempData)}
        title="Photos"
        initialData={photos}
      >
        <PhotosForm />
      </EditModal>
    </>
  );
};

export default PhotosCard; 