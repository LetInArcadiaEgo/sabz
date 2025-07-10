import React, { useRef } from 'react';
import styles from './PhotoManager.module.css';
import { FiX, FiPlus, FiMove } from 'react-icons/fi';
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

const SortablePhoto = ({ photo, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: photo.id || `photo-${index}`,
    transition: {
      duration: 200,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.photoItem} ${isDragging ? styles.isDragging : ''}`}
    >
      <img
        src={photo.url || photo}
        alt={`Photo ${index + 1}`}
        className={styles.photo}
        draggable={false}
      />
      <button
        className={styles.removeButton}
        onClick={() => onRemove(index)}
        aria-label="Remove photo"
      >
        <FiX size={16} />
      </button>
      <button
        className={styles.dragHandle}
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <FiMove size={16} />
      </button>
    </div>
  );
};

const PhotoManager = ({ photos, onPhotosChange }) => {
  const fileInputRef = useRef(null);
  const [activeId, setActiveId] = React.useState(null);
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 8,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file
    }));
    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((photo) => (photo.id || `photo-${photos.indexOf(photo)}`) === active.id);
      const newIndex = photos.findIndex((photo) => (photo.id || `photo-${photos.indexOf(photo)}`) === over.id);
      
      onPhotosChange(arrayMove(photos, oldIndex, newIndex));
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <div className={styles.container}>
      <p className={styles.helpText}>
        Drag handle to reorder. Click X to remove.
      </p>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className={styles.photoGrid}>
          <SortableContext
            items={photos.map((photo, index) => photo.id || `photo-${index}`)}
            strategy={rectSortingStrategy}
          >
            {photos.map((photo, index) => (
              <SortablePhoto
                key={photo.id || index}
                photo={photo}
                index={index}
                onRemove={handleRemovePhoto}
              />
            ))}
          </SortableContext>
          
          <button
            className={styles.addButton}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Add photos"
          >
            <FiPlus size={24} />
            <span>Add photos</span>
          </button>
        </div>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <div className={`${styles.photoItem} ${styles.isDragging}`}>
              <img
                src={photos.find((p, i) => (p.id || `photo-${i}`) === activeId)?.url || ''}
                alt="Dragging"
                className={styles.photo}
                draggable={false}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className={styles.hiddenInput}
      />
    </div>
  );
};

export default PhotoManager; 