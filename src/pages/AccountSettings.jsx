import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume, FaKey } from "react-icons/fa6";
import axios  from 'axios'

const AccountSettings = ({ openModal, openPhoneModal }) => {
    const user = useSelector((state) => state.user);
    const [subActiveSection, setSubActiveSection] = useState(null);
    const [updatePassword,setUpdatePassword] = useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
    })

    const toggleSubSection = (section) => {
        setSubActiveSection(subActiveSection === section ? null : section);
    };

    const handleChange = (e) =>{
        setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value });
    }


    const handelPasswordChange = async () => {
        try {
            const { currentPassword, newPassword, confirmPassword } = updatePassword;
    
            // Validate new passwords match
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match');
                return;
            }
    
            // Add a check for password strength here if needed
    
            // Make the API request
            const response = await axios.put('http://localhost:5000/api/auth/update-password', {
                currentPassword,
                newPassword,
                userId: user._id,
            });
    
            // Handle successful password update
            if (response.data.success) {
                alert('Password updated successfully');
                setUpdatePassword({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                alert(response.data.message || 'Error updating password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred while updating the password');
        }
    };
    

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="border rounded-lg p-4 shadow-md mb-4" onClick={() => toggleSubSection('change email')}>
                <div className='flex gap-3 justify-start  items-center  '><MdEmail className='text-[#22B0AF]' /><h3 className="font-semibold cursor-pointer"  > Email Address</h3></div>
                {subActiveSection !== 'change email' && <p className="text-gray-600">Change your email address</p>}
                {
                    subActiveSection === 'change email' &&
                    <div className="flex flex-col items-center justify-center p-4 md:p-6">
                        <div className='shadow-2xl w-full md:w-1/2 p-4 md:p-5'>
                            <h6 className="mb-4">Email Address</h6>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                placeholder={user.email}
                                disabled
                            />
                            <button className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition" onClick={openModal}>
                                Change
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className="border rounded-lg p-4 shadow-md mb-4" onClick={() => toggleSubSection('change phone')}>
                <div className='flex gap-3 justify-start  items-center'><FaPhoneVolume className='text-[#22B0AF]' /><h3 className="font-semibold">Phone Number</h3></div>
                {subActiveSection !== 'change phone' && <p className="text-gray-600">Change your phone number</p>}
                {
                    subActiveSection === 'change phone' &&
                    <div className="flex flex-col items-center justify-center p-4 md:p-6">
                        <div className='shadow-2xl w-full md:w-1/2 p-4 md:p-5'>
                            <h6 className="mb-4">Phone number</h6>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                placeholder={user.phone}
                                disabled
                            />
                            <button className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition" onClick={openPhoneModal}>
                                Change
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className="border rounded-lg p-4 shadow-md" >
                <div className='flex gap-3 justify-start  items-center' onClick={() => toggleSubSection('change password')}><FaKey className='text-[#22B0AF]' /><h3 className="font-semibold">Password Settings</h3></div>
                {subActiveSection !== 'change password' && <p className="text-gray-600">Change your password</p>}
                {
                    subActiveSection === 'change password' &&
                    <div className="flex flex-col items-center justify-center p-4 md:p-6">
                        <div className='shadow-2xl w-full md:w-1/2 p-4 md:p-5'>
                            <h6 className="mb-2">Current Password</h6>
                            <input
                                onChange={handleChange}
                                name='currentPassword'
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            />
                            <h6 className="mb-2">New Password</h6>
                            <input
                                onChange={handleChange}
                                name='newPassword'
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            />
                            <h6 className="mb-2">Confirm Password</h6>
                            <input
                                onChange={handleChange}
                                name='confirmPassword'  
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            />
                            <button className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500 hover:text-white transition" onClick={handelPasswordChange}>
                                Change
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default AccountSettings;
