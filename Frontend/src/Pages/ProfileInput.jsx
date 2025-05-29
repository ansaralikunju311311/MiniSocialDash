import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { api } from '../App';
import axiosInstance from '../utils/axiosConfig';
import Cookies from 'js-cookie';
const ProfileInput = () => {
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value) => {
    if (!value.trim()) return 'Profile ID is required';
    if (value.length < 3) return 'Profile ID must be at least 3 characters';
    if (value.length > 50) return 'Profile ID must be less than 50 characters';
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return 'Only letters, numbers, hyphens, and underscores are allowed';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput(profileId);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Get user email from cookies
    // const userEmail = Cookies.get('userEmail');
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      setError('User not authenticated. Please log in again.');
      return;
    }
    
    console.log('Profile ID submitted:', profileId);
    console.log('User email:', userEmail);
    setError('');
    
    try {
      const response = await axiosInstance.post('/profile', {
        profileId,
        email: userEmail
        // Email is not needed as we're using cookies for authentication
      });
      
      console.log('Profile input response:', response.data);
      setProfileId('');
      navigate('/profile');
    } catch (error) {
      console.error('Error submitting profile ID:', error);
      if (error.response) {
        setError(error.response.data?.message || 'Failed to submit profile ID');
      } else if (error.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setProfileId(e.target.value);

    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '0.5rem',
          color: '#333',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>Welcome, {localStorage.getItem('userName') || 'User'}</h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '0.5rem'
        }}>Enter Profile ID to continue</p>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          opacity: 0.8
        }}>Please enter the profile ID to view or manage the profile</p>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={profileId}
              onChange={handleChange}
              placeholder="Enter profile ID"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: `1px solid ${error ? '#ff4444' : '#ddd'}`,
                borderRadius: '4px',
                boxSizing: 'border-box',
                marginBottom: '0.5rem'
              }}
              autoFocus
            />
            {error && (
              <p style={{
                color: '#ff4444',
                fontSize: '14px',
                margin: '0.25rem 0 0',
                textAlign: 'left'
              }}>{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.9'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInput;