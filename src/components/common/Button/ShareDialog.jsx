import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiCopy } from 'react-icons/fi';
import styles from './ShareDialog.module.css';

const ShareDialog = ({ url, onClose }) => {
  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
    onClose();
  };

  // Ensure modal root exists
  const modalRoot = document.getElementById('modal-root') || (() => {
    const div = document.createElement('div');
    div.id = 'modal-root';
    document.body.appendChild(div);
    return div;
  })();

  // Lock body scroll while open
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const dialogMarkup = (
    <>
      <div className={styles.backdrop} onClick={(e)=>{e.stopPropagation(); onClose();}} />
      <div className={styles.dialog} role="dialog" aria-modal="true">
        <h2 className={styles.title}>Share this listing</h2>
        <button className={styles.copyButton} onClick={handleCopy}>
          <FiCopy className={styles.copyIcon} />
          <span>Copy Link</span>
        </button>
      </div>
    </>
  );

  return createPortal(dialogMarkup, modalRoot);
};

export default ShareDialog; 