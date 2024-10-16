import React, { useState } from 'react';
import Spinner from '../utils/Spinner';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/user'; 

const EditModal = ({ handleInputChange, closeModal, formData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // Call the update API
            const response = await axios.put(
                'http://localhost:5000/api/auth/extra-user-info', formData);

            if (response) {
                const { user } = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('user', JSON.stringify(user));
                dispatch(updateUser(user));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-full md:w-3/4 lg:w-2/3 overflow-y-auto max-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Edit Profile</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ✖
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-gray-700">First Name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-gray-700">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-gray-700">Website</label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">Facebook</label>
                        <input
                            type="text"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">Instagram</label>
                        <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">Twitter</label>
                        <input
                            type="text"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">LinkedIn</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-gray-700">Address</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                            placeholder="Address line 1"
                        />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <input
                            type="text"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                            placeholder="Address line 2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">City/Suburb</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700">Zip/Post Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="border rounded p-2"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={closeModal}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner size={16} /> : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
