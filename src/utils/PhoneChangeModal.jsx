import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../utils/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/user';

const PhoneChangeModal = ({ closePhoneModal }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newPhone, setNewPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNewPhone(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newPhone) newErrors.newPhone = 'Phone number is required';
    else if (!/^\d{10}$/.test(newPhone)) newErrors.newPhone = 'Phone number is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePhone = () => {
    if (!validateForm()) return;

    setLoading(true);
    axios.put('https://eventsphere-backend-neu9.onrender.com/api/auth/update-phone', { userId: user._id, newPhone })
      .then(response => {
        if (response) {
          const updatedUser = { ...user, phone: newPhone };
          dispatch(setUser(updatedUser));
          localStorage.setItem('user', JSON.stringify(updatedUser));
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          closePhoneModal();
        }
      })
      .catch(error => {
        console.error('There was an error updating the phone number!', error);
        setErrors({ newPhone: 'Failed to update phone number' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-4 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Phone Number</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">New Phone Number</label>
            <input
              type="text"
              name="newPhone"
              value={newPhone}
              onChange={handleChange}
              className="w-full p-2 border-2 border-gray-500 rounded-lg focus:outline-none"
            />
            {errors.newPhone && <p className="text-red-600 text-sm">{errors.newPhone}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closePhoneModal}
              className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdatePhone}
              className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneChangeModal;
