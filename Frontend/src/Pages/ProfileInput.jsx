import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiUser, FiArrowRight, FiLoader } from 'react-icons/fi'; 
const ProfileInput = () => {
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    const userEmail = localStorage.getItem('email');
    console.log(userEmail)
    if (!userEmail) {
      setError('User not authenticated. Please log in again.');
      return;
    }
    console.log('Profile ID submitted:', profileId);
    console.log('User email:', userEmail);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/profile-id', {
        profileId,
        email: userEmail
      }, {
        withCredentials: true
      });
      console.log('Profile input response:', response.data);
      setProfileId('');
      navigate('/dashboard', { replace: true });
      toast.success('Profile ID submitted successfully');
    } catch (error) {
      console.error('Error submitting profile ID:', error);
      if (error.response) {
        setError(error.response.data?.message || 'Failed to submit profile ID');
        toast.error(error.response.data?.message || 'Failed to submit profile ID');
      } else if (error.request) {
        setError('Network error. Please check your connection.');
        toast.error('Network error. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
        toast.error('An error occurred. Please try again.');
      }
    }
  };
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/profile', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      console.log("vvv",response.data)
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
      toast.error('Failed to load user data');
      } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        toast.error('User not authenticated. Please log in again.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/api/verify-token', {
          withCredentials: true
        });

        const userEmail = localStorage.getItem('email');
        const username = localStorage.getItem('username');
        if (!userEmail || !username) {
          throw new Error('User email or username not found');
        }
        await fetchUserData();
      } catch (error) {
        console.error('Token verification failed:', error);
        Cookies.remove('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        toast.error('Your session has expired. Please log in again.');
        navigate('/login', { 
          state: { 
            message: 'Your session has expired. Please log in again.' 
          } 
        });
      }
    };

    verifyToken();
  }, [navigate]);

  const handleChange = (e) => {
    setProfileId(e.target.value);

    if (error) setError('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-2">
            <div className="bg-white/20 p-3 rounded-full">
              <FiUser className="w-6 h-6" />
            </div>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-2xl font-bold text-center">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <FiLoader className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              `Welcome, ${userData?.username || localStorage.getItem('username') || 'User'}`
            )}
          </motion.h1>
        </div>

        {userData && (
          <motion.div 
            variants={itemVariants}
            className="p-4 bg-blue-50 border-b border-blue-100"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FiUser className="w-5 h-5" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{userData.username}</p>
                <p className="text-xs text-gray-500 truncate">{userData.email}</p>
              </div>
            </div>
          </motion.div>
        )}
        <motion.div variants={itemVariants} className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Enter Profile ID</h2>
            <p className="mt-1 text-sm text-gray-500">Please enter the profile ID to view or manage the profile</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={profileId}
                  onChange={handleChange}
                  placeholder="e.g., johndoe123"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  autoFocus
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
                isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors duration-200`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Continue
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileInput;