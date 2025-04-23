import React from 'react';
import styles from './SubmitListingPage.module.css';
import { useNavigate } from 'react-router-dom';

const SubmitListingPage = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Tell us about your property",
      description: "Share your property's basic details."
    },
    {
      title: "Add photos and a title",
      description: "Upload photos and add a title and description."
    },
    {
      title: "Finish up and publish",
      description: "Choose a starting price, verify a few details, then publish your listing."
    }
  ];

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')} className={styles.exitButton}>
        Exit
      </button>

      <div className={styles.content}>
        <h1 className={styles.title}>Easily add your property listing on Sabz</h1>

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

        <button onClick={() => console.log('Get Started clicked')} className={styles.getStartedButton}>
          Get started
        </button>
      </div>
    </div>
  );
};

export default SubmitListingPage; 