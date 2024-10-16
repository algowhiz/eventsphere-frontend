import React, { useRef , useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { updateUser } from '../../store/user';
import AlertModal from '../../utils/AlertModal';

const Dashboard = () => {

  const user = useSelector((state) => state.user);
  console.log(user);
  
  const location = useLocation();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ message: '', type: '', show: false });
  const [imageUpdateLoading, setImageUpdateLoading] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', user._id);

      try {
        setImageUpdateLoading(true);
        const response = await axios.post('http://localhost:5000/api/auth/update-profile-image', formData,);

        const updatedUser = {
          ...user,
          profileImage: response.data.profileImage,
        };
               

        dispatch(updateUser(updatedUser));

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAlert({ message: 'Profile image updated successfully!', type: 'success', show: true });

      } catch (error) {
        setImageUpdateLoading(false);
        setAlert({ message: 'Failed to update profile image. Please try again.', type: 'error', show: true });
      }finally{
        setImageUpdateLoading(false);
      }
    }
  };

  return (
    <>
      <div className="hidden md:block max-w-full bg-gradient-to-r from-teal-100 to-teal-200 h-auto md:h-64 rounded-lg overflow-visible relative shadow-lg ">
      {imageUpdateLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="spinner border-4 border-t-4 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
        <div className="flex flex-col gap-3 md:flex-row items-center h-full p-3 relative">
          
          <div className="w-full md:w-1/4 flex justify-center md:justify-center overflow-visible">
            <img
              src={user.profileImage || 'https://i.postimg.cc/8Pp0NY9x/avatar-8.png'}
              alt="Profile"
              className="w-[194px] h-[194px] md:-bottom-6 absolute rounded-full border-8 border-white object-cover shadow-md cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full hidden md:block md:w-3/4 text-center md:text-left mt-4 md:mt-0">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-gray-600 font-medium">
                Member Since {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">
                {user.name}
              </h2>
            </div>
            <div className="flex bottom-0 absolute justify-center items-center md:justify-start mt-4 md:mt-8 gap-6 md:gap-24">
              <Link

                to="/dashboard/home"
                className={
                  `text-black font-semibold py-2 px-4 ${location.pathname === '/dashboard/home' ? 'bg-white' : ''}`
                }
              >
                Home
              </Link>
              <Link
                to="/dashboard/profile"
                className={
                  `text-black font-semibold py-2 px-4 ${location.pathname === '/dashboard/profile' ? 'bg-white' : ''}`
                }
              >
                Profile
              </Link>
              <Link
                to="/dashboard/settings"
                className={
                  `text-black font-semibold py-2 px-4 ${location.pathname === '/dashboard/settings' ? 'bg-white' : ''}`
                }
              >
                Settings
              </Link>
              <Link
                to="/eventpage"
                className="text-black font-semibold py-2 px-4 focus:text-black focus:bg-white"
              >
                Explore Events
              </Link>
              <Link
                to="/"
                className="text-black font-semibold py-2 px-4 focus:text-black focus:bg-white"
              >
                Hero Page
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden max-w-full bg-gradient-to-r from-teal-100 to-teal-200 ">
        <div className="flex flex-col items-center p-5  ">

          <img
            src={user.profileImage ? user?.profileImage : 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-[150px] h-[150px] rounded-full border-4 relative -bottom-14 border-white object-cover shadow-md mb-4"
            onClick={() => fileInputRef.current.click()}
          />
          <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />

        </div>
      </div>
      <div>
        <div className='block md:hidden mt-6'>
          <div className='flex justify-center items-center flex-col'>
            <p className="text-gray-600 font-medium">
              Member Since {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">{user.name}</h2>
          </div>
          <div className="flex justify-center mt-4 flex-wrap gap-6">
            <Link
              to="/dashboard/home"
              className={`text-black font-semibold py-2 px-4 ${location.pathname === '/dashboard/home' ? 'text-white bg-[#18a19b]' : 'focus:text-white focus:bg-[#18a19b]'
                }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard/profile"
              className={`text-black font-semibold py-2 px-4 ${location.pathname === '/dashboard/profile' ? 'text-white bg-[#18a19b]' : 'focus:text-white focus:bg-[#18a19b]'
                }`}
            >
              My Orders
            </Link>
            <Link
              to="/dashboard/settings"
              className={`text-black font-semibold py-2 px-4 ${location.pathname === '/dashboard/settings' ? 'text-white bg-[#18a19b]' : 'focus:text-white focus:bg-[#18a19b]'
                }`}
            >
              Settings
            </Link>
            <Link
              to="/eventpage"
              className="text-black font-semibold py-2 px-4 focus:text-white focus:bg-[#18a19b]"
            >
              Explore Events
            </Link>
            <Link
              to="/"
              className="text-black font-semibold py-2 px-4 focus:text-white focus:bg-[#18a19b]"
            >
              Hero Page
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
      <div className="mt-8">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
