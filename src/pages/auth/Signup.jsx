import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalAnimated, setModalAnimated] = useState(false);
  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');

  // Modal animation effect
  useEffect(() => {
    if (showSuccessModal) {
      // Small delay to ensure the modal renders before animating
      const timer = setTimeout(() => {
        setModalAnimated(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setModalAnimated(false);
    }
  }, [showSuccessModal]);

  // Progress bar effect
  useEffect(() => {
    if (showSuccessModal && modalAnimated) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            navigate('/');
            return 100;
          }
          return prev + 2; // Complete in ~3 seconds
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [showSuccessModal, modalAnimated, navigate]);

  const handleCloseModal = () => {
    setModalAnimated(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/');
    }, 300);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const { error } = await signUp(data.email, data.password);
    
    if (error) {
      setError(error.message);
    } else {
      setShowSuccessModal(true);
    }
    
    setLoading(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sign up</h1>
          </div>

          <div className={styles.content}>
            <h2 className={styles.welcome}>Create your account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {error && (
                <div className={styles.error}>
                  {error}
                </div>
              )}

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <span className={styles.inputError}>{errors.email.message}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                {errors.password && (
                  <span className={styles.inputError}>{errors.password.message}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={styles.input}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                {errors.confirmPassword && (
                  <span className={styles.inputError}>{errors.confirmPassword.message}</span>
                )}
              </div>

              <button 
                type="submit" 
                className={styles.continueButton}
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Continue'}
              </button>
            </form>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <div className={styles.authOptions}>
              <p className={styles.switchText}>
                Already have an account? <Link to="/login" className={styles.switchLink}>Log in</Link>
              </p>
            </div>

            <div className={styles.help}>
              <Link to="/forgot-password" className={styles.helpLink}>
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <>
          <div className={`${styles.successModalOverlay} ${modalAnimated ? styles.visible : ''}`} onClick={handleCloseModal}></div>
          <div className={`${styles.successModal} ${modalAnimated ? styles.open : ''}`}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Account created!</h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className={styles.successContent}>
              <p>Please check your email to confirm your account.</p>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className={styles.redirectText}>Redirecting to home...</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup; 