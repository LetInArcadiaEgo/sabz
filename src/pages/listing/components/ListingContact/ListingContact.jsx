import React from 'react';
import styles from './ListingContact.module.css';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const ListingContact = () => {
  const phoneNumber = '+1234567890'; // Replace with actual phone number

  return (
    <div className={styles.contactContainer}>
      <a href={`tel:${phoneNumber}`} className={styles.callButton}>
        <FaPhone className={styles.phoneIcon} /> Call
      </a>
      <a 
        href={`https://wa.me/${phoneNumber}`} 
        className={styles.whatsappButton}
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaWhatsapp /> WhatsApp
      </a>
    </div>
  );
};

export default ListingContact; 