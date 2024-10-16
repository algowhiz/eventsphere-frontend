// SuccessModal.js
import React from 'react';

const SuccessModal = ({ showModal, closeModal }) => {
    return (
        showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Signup Successful!</h2>
                    <p className="mb-6">You have successfully signed up. You can now login.</p>
                    <button
                        onClick={closeModal}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    );
};

export default SuccessModal;
