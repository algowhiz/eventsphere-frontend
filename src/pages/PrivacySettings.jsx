import React from 'react';
import { IoIosSettings } from "react-icons/io";
const PrivacySettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
      <div className="border rounded-lg p-4 shadow-md mb-4">
      <div  className='flex gap-3 justify-start  items-center'><IoIosSettings size={23}  className='text-[#22B0AF]'/><h3 className="font-semibold">Privacy Settings</h3></div>
        <p className="text-gray-600">Configure your privacy settings</p>
      </div>
    </div>
  );
};

export default PrivacySettings;
