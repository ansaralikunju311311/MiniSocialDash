import React, { useState, useEffect } from 'react';
import DashboardCard from '../Components/Dashboard/DashboardCard';
import ActivityTable from '../Components/Dashboard/ActivityTable';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard', {
          withCredentials: true
        });
        const { data } = response.data;
        
        if (!data) {
          navigate('/login');
          return;
        }
        if(!data.profileId){
          navigate('/profile');
          
        }
        setLoading(true);
        setUserData(data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
        navigate('/login'); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [navigate]); 






  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <FaSpinner className="animate-spin h-12 w-12 text-blue-500" />
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your connections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">    
          <div className="lg:col-span-2 space-y-6">
            <ActivityTable />
          </div>
          
          <div className="space-y-6">
            {userData && <DashboardCard userData={userData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;