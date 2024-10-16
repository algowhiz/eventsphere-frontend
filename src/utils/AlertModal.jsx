// src/utils/AlertModal.js
import React, { useEffect } from 'react';

const AlertModal = ({ message, type, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg shadow-lg text-white ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            {message}
        </div>
    );
};

export default AlertModal;
