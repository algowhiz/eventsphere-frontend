import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdModeEditOutline } from "react-icons/md";
import EditModal from '../../utils/EditModal';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user.name || '',
    lastName: user.lastName || '',
    bio: user.bio || '',
    website: user.website || '',
    facebook: user.facebook || '',
    instagram: user.instagram || '',
    twitter: user.twitter || '',
    linkedin: user.linkedin || '',
    addressLine1: user.addressLine1 || '',
    country: user.country || '',
    state: user.state || '',
    city: user.city || '',
    zipCode: user.zipCode || '',
    userId:user._id,
  });

  console.log(user._id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 

  return (
    <div className="p-8 flex flex-col md:flex-row w-full">
      <div className="md:w-3/7 mb-8 md:mb-0 pr-4">
        <p className="text-gray-600">
          You can enable or disable your personal profile and manage what information you would like to share by visiting the privacy settings.
        </p>
      </div>
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className='w-full'>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user.profileImage || 'https://i.postimg.cc/8Pp0NY9x/avatar-8.png'}
                alt="Profile"
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-teal-500"
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.status || 'Active'}</p>
              </div>
            </div>
            <button onClick={toggleExpand} className="text-teal-500 focus:outline-none">
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isExpanded && (
            <div className="bg-gray-100 p-10 flex justify-center items-center">
              <div className='bg-white p-10 shadow-2xl w-11/12 lg:w-2/3 relative'>
                <div className="absolute top-4 right-4">
                  <MdModeEditOutline
                    className="text-teal-500 cursor-pointer"
                    size={24}
                    onClick={openModal}
                  />
                </div>
                <div className="flex items-center">
                  <img
                    src={user.profileImage || 'https://i.postimg.cc/8Pp0NY9x/avatar-8.png'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-teal-500 mx-auto"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{`Time zone - ${user.timezone || 'Not set'}`}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <EditModal handleInputChange={handleInputChange} formData={formData} closeModal={closeModal}  />}
    </div>
  );
};

export default Profile;
