import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdVerified } from "react-icons/md";
import AlertModal from '../../utils/AlertModal';
import { IoArrowBackSharp } from "react-icons/io5";
import Spinner from '../../utils/Spinner';

const UserDashboard = () => {
  const { organizerId, eventId } = useParams(); // Get organizerId from URL params
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initialize user as null
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://eventsphere-backend-neu9.onrender.com/api/auth/user/${organizerId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAlert({ message: 'Error fetching user data', type: 'error', show: true });
      }
    };

    if (organizerId) {
      fetchUserData();
    }
  }, [organizerId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (user === null) {
    return <div ><Spinner /></div>; // Show loading state if user data is being fetched
  }

  if (user === undefined) {
    return <div>User not found</div>; // Show a fallback message if user data is undefined
  }

  const handleGoBack = () => {
    navigate(`/event/${eventId}`); // Go back to the previous page
  };

  return (
    <>
      <div className="hidden md:block max-w-full bg-gradient-to-r from-teal-100 to-teal-200 h-auto md:h-64 rounded-lg overflow-visible relative shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row items-center h-full p-3 relative">
          <div className="w-full md:w-1/4 flex justify-center md:justify-center overflow-visible">
            <img
              src={user.profileImage || 'https://i.postimg.cc/8Pp0NY9x/avatar-8.png'}
              alt="profile"
              className="w-[194px] h-[194px] md:-bottom-6 absolute rounded-full border-8 border-white object-cover shadow-md "
            />
          </div>
          <div className="w-full hidden md:block md:w-3/4 text-center md:text-left mt-4 md:mt-0">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-gray-600 font-medium">
                Member Since {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
              </p>
              <h2 className="text-2xl flex gap-2 md:text-4xl font-bold text-gray-800 mt-2 ">
                {user.name}{user.isVerified && <MdVerified className=" bg-white rounded-full" style={{ color: 'green' }} />}
              </h2>
              <p className='font-bold'>Follower <span className='font-mono  '>{user.followers}</span> | Following <span className='font-mono'>{user.following}</span></p>
            </div>
            <div className="flex bottom-0 absolute justify-center items-center md:justify-start mt-4 md:mt-8 gap-6 md:gap-24">
              <Link
                to={`/organizer/${organizerId}/${eventId}/personal-info`}
                className={`text-black font-semibold py-2 px-4 ${location.pathname === `/organizer/${organizerId}/${eventId}/personal-info` ? 'bg-white' : ''}`}
              >
                Personal Info
              </Link>
              <Link
                to={`/organizer/${organizerId}/${eventId}/history`}
                className={`text-black font-semibold py-2 px-4 ${location.pathname === `/organizer/${organizerId}/${eventId}/history` ? 'bg-white' : ''}`}
              >
                Over All History
              </Link>
              <Link
                to={`/organizer/${organizerId}/${eventId}/social-connect`}
                className={`text-black font-semibold py-2 px-4 ${location.pathname === `/organizer/${organizerId}/${eventId}/social-connect` ? 'bg-white' : ''}`}
              >
                Social Connect
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className='absolute flex gap-2 justify-center items-center top-1 left-3 font-semibold ' onClick={handleGoBack}> <IoArrowBackSharp />Go Back</p>
      <div className="block md:hidden max-w-full bg-gradient-to-r from-teal-100 to-teal-200">
        <div className="flex flex-col items-center p-5">
          <img
            src={user.profileImage || 'https://via.placeholder.com/150'}
            alt="profile"
            className="w-[150px] h-[150px] rounded-full border-4 relative -bottom-14 border-white object-cover shadow-md mb-4"
          />
        </div>
      </div>
      <div>
        <div className="block md:hidden mt-6">
          <div className="flex justify-center items-center flex-col">
            <p className="text-gray-600 font-medium">
              Member Since {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
            </p>
            <h2 className="text-2xl font-bold flex gap-3 justify-center items-center text-gray-800 mt-2">
              {user.name}{user.isVerified && <MdVerified className="bg-white rounded-full" style={{ color: 'green' }} />}
            </h2>
          </div>
          <div className="flex justify-center mt-4 flex-wrap gap-6">
            <Link
              to={`/organizer/${organizerId}/${eventId}/personal-info`}
              className={`text-black font-semibold py-2 px-4 ${location.pathname === `/organizer/${organizerId}/${eventId}/personal-info` ? 'text-white bg-[#18a19b]' : 'focus:text-white focus:bg-[#18a19b]'}`}
            >
              Personal Info
            </Link>
            <Link
              to={`/organizer/${organizerId}/${eventId}/history`}
              className={`text-black font-semibold py-2 px-4 ${location.pathname === `/organizer/${organizerId}/${eventId}/history` ? 'text-white bg-[#18a19b]' : 'focus:text-white focus:bg-[#18a19b]'}`}
            >
              Over All History
            </Link>
            <Link
              to={`/organizer/${organizerId}/${eventId}/social-connect`}
              className={`text-black font-semibold py-2 px-4 ${location.pathname === `/organizer/${organizerId}/${eventId}/social-connect` ? 'text-white bg-[#18a19b]' : 'focus:text-white focus:bg-[#18a19b]'}`}
            >
              Social Connect
            </Link>
          </div>
        </div>
      </div>
      <AlertModal
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
      />
      <div className="">
        <Outlet context={{ user }} />
      </div>
    </>
  );
};

export default UserDashboard;
