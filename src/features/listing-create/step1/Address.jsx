import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Address.module.css';
import commonStyles from './ListingFlowCommon.module.css';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const Address = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    streetAddress: '',
    aptFloorBldg: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    navigate('/listing-flow/step-1/4_amenities');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isFormValid = formData.city && formData.streetAddress;

  useEffect(() => {
    const resetViewport = () => {
        // on next frame, scroll to current position (no visual jump) > to force repaint
        requestAnimationFrame(() => {
            window.scrollTo(window.scrollX, window.scrollY)
        })
    }
    window.addEventListener('focusout', resetViewport)
    return () => {
        window.removeEventListener('focusout', resetViewport)
    }
}, [])

  return (
    <div className={styles.container}>
      <ExitButton />
      
      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>Confirm your address</h1>
        <p className={commonStyles.stepSubtitle}>
          Your address will only be shared with approved buyers.
        </p>

        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={styles.countrySelect}
            >
              <option value="" disabled>Select city</option>
              <option value="Lahore">Lahore</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Multan">Multan</option>
              <option value="Gujranwala">Gujranwala</option>
              <option value="Sialkot">Sialkot</option>
              <option value="Bahawalpur">Bahawalpur</option>
              <option value="Sargodha">Sargodha</option>
              <option value="Sheikhupura">Sheikhupura</option>
              <option value="Gujrat">Gujrat</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder=" "
              className={styles.input}
            />
            <label className={styles.label}>Area (DHA, Gulberg, Lake City, etc.)</label>
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder=" "
              className={styles.input}
            />
            <label className={styles.label}>Street address</label>
          </div>
          
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="aptFloorBldg"
              value={formData.aptFloorBldg}
              onChange={handleInputChange}
              placeholder=" "
              className={styles.input}
            />
            <label className={styles.label}>Apt, floor, bldg (if applicable)</label>
          </div>
          
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder=" "
              className={styles.input}
            />
            <label className={styles.label}>Postal code (if applicable)</label>
          </div>
        </div>

        <NavigationButtons 
          onNext={handleNext}
          onBack={handleBack}
          nextLabel="Next"
          backLabel="Back"
          disableNext={!isFormValid}
        />
      </div>
    </div>
  );
};

export default Address; 