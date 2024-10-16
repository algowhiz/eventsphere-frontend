import React from 'react';
import { FaTicketAlt, FaGlobe, FaMapMarkerAlt, FaDollarSign, FaClipboardList } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

const History = () => {

  const { user } = useOutletContext();
  const { free, offline, online, paid, total } = user.eventsHosted || {};

  const stats = [
    { label: 'Free Events', value: free, icon: <FaTicketAlt />, color: 'bg-blue-500' },
    { label: 'Offline Events', value: offline, icon: <FaMapMarkerAlt />, color: 'bg-green-500' },
    { label: 'Online Events', value: online, icon: <FaGlobe />, color: 'bg-purple-500' },
    { label: 'Paid Events', value: paid, icon: <FaDollarSign />, color: 'bg-red-500' },
    { label: 'Total Events', value: total, icon: <FaClipboardList />, color: 'bg-teal-500' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Event Hosting History</h2>
      <div className="flex flex-col w-full md:flex-row gap-6 flex-wrap justify-center items-center">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className={`flex items-center p-4 w-full md:w-[37%] rounded-lg shadow-md ${color} text-white`}>
            <div className="text-4xl mr-4">
              {icon}
            </div>
            <div>
              <p className="text-lg font-medium">{label}</p>
              <p className="text-2xl font-bold">{value || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
