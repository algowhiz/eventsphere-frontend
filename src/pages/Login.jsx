import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/user';
import AlertModal from '../utils/AlertModal';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        const newErrors = {};
        if (!form.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            axios.post('https://eventsphere-backend-neu9.onrender.com/api/auth/login', form)
                .then(response => {
                    const { token, user } = response.data;
                    if (form.rememberMe) {
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));
                    } else {
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('user', JSON.stringify(user));
                    }
                    dispatch(setUser(user));
                    navigate('/dashboard/home');
                })
                .catch(error => {
                    setAlert({ show: true, message: 'Inavalid credential', type: 'error' });
                    console.error('Error during login:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <div className="min-h-screen p-10 md:p-5  flex items-center justify-center  bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={form.rememberMe}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-gray-700">Remember me</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <p className='text-gray-700'>Don't have an Account <Link to='/signup'><span className='text-gray-400'>SignUp ?</span></Link></p>
                </form>
            </div>
            <AlertModal
                show={alert.show}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ show: false, message: '', type: '' })}
            />
        </div>
    );
};

export default Login;
