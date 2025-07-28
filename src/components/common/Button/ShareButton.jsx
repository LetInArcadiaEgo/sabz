import React, { useState } from 'react';
import { FiShare } from 'react-icons/fi';
import styles from './ShareButton.module.css';
import ShareDialog from './ShareDialog';

/**
 * Reusable share button leveraging the Web Share API when available.
 * Falls back to copying the URL to the clipboard (or prompt) on unsupported browsers.
 */
const ShareButton = ({ url, className }) => {
  const [open, setOpen] = useState(false);
  const shareUrl = url || window.location.href;

  const toggle = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setOpen((v) => !v);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.shareButton} ${className || ''}`.trim()}
        onClick={toggle}
        aria-label="Share listing"
      >
        <FiShare />
      </button>
      {open && <ShareDialog url={shareUrl} onClose={toggle} />}
    </>
  );
};

export default ShareButton; 