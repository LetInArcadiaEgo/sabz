import React from 'react';
import styles from './ListingFlowIntro.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';

const ListingFlowIntro = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Tell us about your property",
      description: "Share what kind of property you're listing and its location.",
      pages: 4
    },
    {
      title: "Add photos and some final details",
      description: "Upload photos and add a title, description, and price.",
      pages: 5
    },
  ];

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={styles.title}>There are two simple steps to listing with Sabz!</h1>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepContent}>
                <h2>{`${index + 1}. ${step.title}`}</h2>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/listing-flow/step-1/1_proptype')} className={styles.getStartedButton}>
          Get started
        </button>
      </div>
    </div>
  );
};

export default ListingFlowIntro; 