import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../utils/Spinner';
import { useSelector } from 'react-redux';

const EmailChangeModal = ({ closeModal }) => {

  const user = useSelector((state) => state.user);
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    otp: '',
    step: 1,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  const validateEmailForm = () => {
    const newErrors = {};

    if (emailForm.step === 1) {
      if (!emailForm.newEmail) newErrors.newEmail = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(emailForm.newEmail)) newErrors.newEmail = 'Email address is invalid';
    }

    if (emailForm.step === 2) {
      if (!emailForm.otp) newErrors.otp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = () => {
    if (!validateEmailForm()) return;

    setLoading(true);
    axios.post('https://eventsphere-backend-neu9.onrender.com/api/auth/send-otp-to-update-email', { email:   user.email  , update_email:emailForm.newEmail})
      .then(response => {
        setOtpSent(true);
        setEmailForm(prev => ({ ...prev, step: 2 }));
      })
      .catch(error => {
        console.error('There was an error sending the OTP!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVerifyOtp = () => {
    if (!validateEmailForm()) return;

    setLoading(true);
    axios.post('https://eventsphere-backend-neu9.onrender.com/api/auth/verify-otp-email', { email: user.email, otp: emailForm.otp })
      .then(response => {
        if (response.status === 200) {
          handleUpdateEmail();
        } else {
          setErrors({ otp: 'Invalid OTP or OTP has expired' });
        }
      })
      .catch(error => {
        console.error('There was an error verifying the OTP!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateEmail = () => {
    setLoading(true);
    axios.post('https://eventsphere-backend-neu9.onrender.com/api/auth/update-email', { email:user.email , newEmail:emailForm.newEmail })
      .then(response => {
        if (response.status === 200) {
          setEmailForm({ newEmail: '', otp: '', step: 1 });
          const updatedUser = { ...user, email: emailForm.newEmail };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          closeModal();
        } else {
          setErrors({ otp: 'Failed to update email' });
        }
      })
      .catch(error => {
        console.error('There was an error updating the email!', error);
        setErrors({ otp: 'Failed to update email' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className=" p-4 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Email Address</h2>
        <form className="space-y-4">
          {emailForm.step === 1 && (
            <>
              <div>
                <label className="block text-gray-700">New Email</label>
                <input
                  type="email"
                  name="newEmail"
                  value={emailForm.newEmail}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-500 rounded-lg focus:outline-none"
                />
                {errors.newEmail && <p className="text-red-600 text-sm">{errors.newEmail}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : 'Next'}
                </button>
              </div>
            </>
          )}
          {emailForm.step === 2 && (
            <>
              <div>
                <label className="block text-gray-700">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={emailForm.otp}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-500 rounded-lg focus:outline-none"
                />
                {errors.otp && <p className="text-red-600 text-sm">{errors.otp}</p>}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : 'Verify OTP'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailChangeModal;
