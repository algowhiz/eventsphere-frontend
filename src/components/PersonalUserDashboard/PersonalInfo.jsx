import React from 'react';
import { MdVerified } from "react-icons/md";
import { useOutletContext } from 'react-router-dom';

const PersonalInfo = () => {
  const { user } = useOutletContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8  rounded-lg ">
      <h2 className="text-2xl md:text-4xl font-extrabold mb-8 text-gray-900">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6  rounded-lg shadow-2xl flex flex-col items-center border-gray-400 border-2">
          <p className="font-medium text-lg text-gray-600">Name:</p>
          <p className="text-2xl text-gray-900 font-bold mt-2 flex items-center">
            {user.name}
            {user.isVerified && <MdVerified className="text-green-500 ml-2" />}
          </p>
        </div>
        <div className="p-6  rounded-lg shadow-2xl flex flex-col items-center border-gray-400 border-2">
          <p className="font-medium text-lg text-gray-600">Email:</p>
          <p className="text-xl md:text-2xl text-gray-900 font-bold mt-2 max-w-full break-all overflow-hidden text-ellipsis">
            {user.email}
          </p>
        </div>
        <div className="p-6  rounded-lg shadow-2xl flex flex-col items-center border-gray-400 border-2">
          <p className="font-medium text-lg text-gray-600">Phone:</p>
          <p className="text-2xl text-gray-900 font-bold mt-2">{user.phone}</p>
        </div>
        <div className="p-6  rounded-lg shadow-2xl flex flex-col items-center border-gray-400 border-2">
          <p className="font-medium text-lg text-gray-600">Address:</p>
          <div className="text-center text-gray-900 font-bold mt-2 leading-relaxed max-w-full break-all overflow-hidden text-ellipsis">
            <p>{user?.address?.addressLine1}</p>
            <p>{user?.address?.city}, {user?.address?.state}</p>
            <p>{user?.address?.country} - {user?.address?.zipCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
