import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await resetPassword(data.email);
    
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for a password reset link!');
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset your password</h1>
        </div>

        <div className={styles.content}>
          <h2 className={styles.welcome}>Forgot your password?</h2>
          <p style={{ color: '#717171', marginBottom: '24px' }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {message && (
              <div className={styles.success}>
                {message}
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

            <button 
              type="submit" 
              className={styles.continueButton}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className={styles.authOptions}>
            <p className={styles.switchText}>
              Remember your password? <Link to="/login" className={styles.switchLink}>Back to login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 