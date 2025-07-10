import React, { useEffect, useRef, useState } from 'react';
import styles from './EditModal.module.css';
import NavigationButtons from '../Button/NavigationButtons';

const EditModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  children,
  disableSave = false,
  initialData = null // Add initialData prop to store original state
}) => {
  const modalRef = useRef(null);
  const headerRef = useRef(null);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tempData, setTempData] = useState(initialData); // Add temporary state

  // Reset temp data when modal opens with new initial data
  useEffect(() => {
    if (isOpen && initialData !== null) {
      setTempData(initialData);
    }
  }, [isOpen, initialData]);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Use RAF to ensure modal is in DOM before adding modalOpen class
      requestAnimationFrame(() => {
        setIsMounted(true);
      });
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  // Handle closing animation and reset state
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setIsMounted(false);
      setTempData(initialData); // Reset to initial data on close
    }, 250);
  };

  // Handle save with temporary data
  const handleSave = () => {
    onSave(tempData);
  };

  // Update temporary data
  const updateTempData = (newData) => {
    setTempData(newData);
  };

  // Manage body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.modalOpen);
    } else {
      document.body.classList.remove(styles.modalOpen);
    }
    return () => {
      document.body.classList.remove(styles.modalOpen);
    };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    if (!headerRef.current?.contains(e.target)) return;
    e.preventDefault();
    isDragging.current = true;
    dragStartY.current = e.touches[0].clientY;
    if (modalRef.current) {
      modalRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !modalRef.current) return;
    e.preventDefault();
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - dragStartY.current;
    
    if (deltaY < 0) return; // Prevent dragging upwards
    
    modalRef.current.style.transform = `translateY(${deltaY}px)`;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || !modalRef.current) return;
    
    isDragging.current = false;
    const currentTransform = modalRef.current.style.transform;
    const match = currentTransform.match(/translateY\((\d+)px\)/);
    const currentY = match ? parseInt(match[1]) : 0;
    
    modalRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    if (currentY > modalRef.current.offsetHeight * 0.3) {
      modalRef.current.style.transform = 'translateY(100%)';
      handleClose();
    } else {
      modalRef.current.style.transform = 'translateY(0)';
    }
  };

  if (!isOpen) return null;

  // Clone children and inject temporary state management props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Only inject props if they don't already exist on the child
      const newProps = {};
      if (!child.props.hasOwnProperty('value')) {
        newProps.value = tempData;
      }
      if (!child.props.hasOwnProperty('onChange')) {
        newProps.onChange = updateTempData;
      }
      
      // Only clone with new props if we have props to inject
      return Object.keys(newProps).length > 0
        ? React.cloneElement(child, newProps)
        : child;
    }
    return child;
  });

  return (
    <>
      <div 
        className={`${styles.backdrop} ${styles.backdropVisible}`}
        onClick={handleClose}
      />
      <div 
        className={`${styles.modal} ${isMounted ? styles.modalOpen : ''} ${isClosing ? styles.willClose : ''}`}
        ref={modalRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.modalHeader} ref={headerRef}>
          <button className={styles.closeButton} onClick={handleClose}>✕</button>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div style={{ width: 20 }} /> {/* Spacer for alignment */}
        </div>
        
        <div className={styles.modalContent}>
          {childrenWithProps}
        </div>
        
        <NavigationButtons
          onBack={handleClose}
          onNext={handleSave}
          backLabel="Cancel"
          nextLabel="Save"
          disableNext={disableSave}
          className={styles.navigationButtons}
        />
      </div>
    </>
  );
};

export default EditModal; 