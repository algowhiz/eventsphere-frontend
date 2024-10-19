import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../utils/Spinner';
import SuccessModal from '../utils/SuccessModal';
import AlertModal from '../utils/AlertModal';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        otp: '',
        image: null, // State to store the selected image file
        step: 1,
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const validate = () => {
        const newErrors = {};
        if (form.step === 1) {
            if (!form.email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email address is invalid';
        }
        if (form.step === 2) {
            if (!form.otp) newErrors.otp = 'OTP is required';
        }
        if (form.step === 3) {
            if (!form.name) newErrors.name = 'Name is required';
            if (!form.password) newErrors.password = 'Password is required';
            else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            if (!form.phone) newErrors.phone = 'Phone number is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSendOtp = () => {
        if (!validate()) return;

        setLoading(true);
        axios.post('https://eventsphere-backend-neu9.onrender.com/api/auth/send-otp-email', { email: form.email })
            .then(response => {
                setOtpSent(true);
                setForm(prev => ({ ...prev, step: 2 }));
            })
            .catch(error => {
                setAlert({ show: true, message: 'User Email already taken', type: 'error' });
                console.error('There was an error sending the OTP!', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleVerifyOtp = () => {
        setLoading(true);
        axios.post('https://eventsphere-backend-neu9.onrender.com/api/auth/verify-otp-email', { email: form.email, otp: form.otp })
            .then(response => {
                setForm(prev => ({ ...prev, step: 3 }));
            })
            .catch(error => {
                setAlert({ show: true, message: 'Invalid OTP !! try again...', type: 'error' });
                console.error('There was an error verifying the OTP!', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('password', form.password);
            formData.append('phone', form.phone);
            if (form.image) {
                formData.append('image', form.image);
            }

            axios.post('https://eventsphere-backend-neu9.onrender.com/api/auth/signup', formData)
                .then(response => {
                    setForm({
                        name: '',
                        email: '',
                        password: '',
                        phone: '',
                        otp: '',
                        image: null,
                        step: 1,
                    });
                    setShowModal(true);
                })
                .catch(error => {
                    setAlert({ show: true, message: 'Error during signup', type: 'error' });
                    console.error('There was an error during signup!', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <div className="min-h-screen p-10 md:p-5  flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {form.step === 1 && (
                        <>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-2 border-gray-500 focus:border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : 'Send OTP'}
                            </button>
                        </>
                    )}
                    {form.step === 2 && otpSent && (
                        <>
                            <div>
                                <label className="block text-gray-700">OTP</label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={form.otp}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-2 border-gray-500 focus:border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.otp && <p className="text-red-600 text-sm">{errors.otp}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? <Spinner /> : 'Verify OTP'}
                            </button>
                        </>
                    )}
                    {form.step === 3 && (
                        <>
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-2 border-gray-500 focus:border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-2 border-gray-500 focus:border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-2 border-gray-500 focus:border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Profile Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 border-2 border-gray-500 focus:border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? <Spinner /> : 'Signup'}
                            </button>
                        </>
                    )}
                </form>
            </div>

            <AlertModal
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ show: false, message: '', type: '' })}
            />
            <SuccessModal showModal={showModal} closeModal={closeModal} />
        </div>
    );
};

export default Signup;
