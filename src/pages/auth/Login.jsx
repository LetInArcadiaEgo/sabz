import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './Auth.module.css';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate(from, { replace: true });
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1 className={styles.title}>Log in</h1>
        </div>

        <div className={styles.content}>
          <h2 className={styles.welcome}>Welcome back</h2>

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

            <button 
              type="submit" 
              className={styles.continueButton}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Continue'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div className={styles.authOptions}>
            <p className={styles.switchText}>
              Don't have an account? <Link to="/signup" className={styles.switchLink}>Sign up</Link>
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
  );
};

export default Login; 