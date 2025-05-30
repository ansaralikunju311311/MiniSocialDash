import React from 'react';
import { FiClock, FiUserCheck, FiUserPlus, FiAlertCircle } from 'react-icons/fi';

// Mock data for connection logs
const mockConnectionLogs = [
  { 
    id: 1, 
    date: '2025-05-30', 
    time: '14:30',
    status: 'connected',
    user: 'Jane Doe',
    message: 'Connected with Jane Doe'
  },
  { 
    id: 2, 
    date: '2025-05-29', 
    time: '11:15',
    status: 'request_sent',
    user: 'Mike Smith',
    message: 'Connection request sent'
  },
  { 
    id: 3, 
    date: '2025-05-28', 
    time: '16:45',
    status: 'pending',
    user: 'Sarah Johnson',
    message: 'Connection request received'
  },
  { 
    id: 4, 
    date: '2025-05-27', 
    time: '09:20',
    status: 'connected',
    user: 'Alex Chen',
    message: 'Connected with Alex Chen'
  },
  { 
    id: 5, 
    date: '2025-05-26', 
    time: '13:10',
    status: 'declined',
    user: 'Emma Wilson',
    message: 'Connection request declined'
  },
];

const StatusBadge = ({ status }) => {
  const statusConfig = {
    connected: {
      icon: <FiUserCheck className="w-4 h-4" />,
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Connected'
    },
    request_sent: {
      icon: <FiUserPlus className="w-4 h-4" />,
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Request Sent'
    },
    pending: {
      icon: <FiClock className="w-4 h-4" />,
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pending'
    },
    declined: {
      icon: <FiAlertCircle className="w-4 h-4" />,
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Declined'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
    </span>
  );
};

const ActivityTable = () => {
  // Stats data
  const stats = [
    { name: 'Total Connections', value: '1,234', change: '+12%', changeType: 'increase' },
    { name: 'Pending Requests', value: '24', change: '+4', changeType: 'increase' },
    { name: 'Response Rate', value: '89%', change: '+2%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <FiUserCheck className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className={`font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>{' '}
                <span className="text-gray-500">from last week</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Connection Activity
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            A list of your recent connections and requests
          </p>
        </div>
        <div className="bg-white overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {mockConnectionLogs.map((log) => (
              <li key={log.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start">
                  <div className="flex-1 min-w-0 pl-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {log.user}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <StatusBadge status={log.status} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {log.message}
                    </p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <span>{log.date}</span>
                      <span className="mx-1">•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between items-center">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All Activity
            </button>
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;