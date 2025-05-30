import React from 'react';
import DashboardCard from '../Components/Dashboard/DashboardCard';
import ActivityTable from '../Components/Dashboard/ActivityTable';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your connections.
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activity Table */}
          <div className="lg:col-span-2 space-y-6">
            <ActivityTable />
          </div>
          
          {/* Right Column - Dashboard Card */}
          <div className="space-y-6">
            <DashboardCard />
            {/* Additional cards/widgets can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;