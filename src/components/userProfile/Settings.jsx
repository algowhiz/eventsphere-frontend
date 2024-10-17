import React, { useState } from 'react';
import AccountSettings from '../../pages/AccountSettings';
import PrivacySettings from '../../pages/PrivacySettings';
import EmailChangeModal from '../../utils/EmailChangeModal';
import PhoneChangeModal from '../../utils/PhoneChangeModal';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showModal, setShowModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openPhoneModal = () => setShowPhoneModal(true);
  const closePhoneModal = () => setShowPhoneModal(false);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4">
          <div className="mb-4 cursor-pointer" onClick={() => toggleSection('account')}>
            <h2 className="text-lg font-semibold"  >Account Settings</h2>
          </div>
          <div className="mb-4 cursor-pointer" onClick={() => toggleSection('privacy')}>
            <h2 className="text-lg font-semibold">Privacy Settings</h2>
          </div>
        </div>
        <div className={`w-full md:flex-1 bg-white rounded-lg ${activeSection ? 'shadow-md' : ''} p-4`}>
          {activeSection === 'account' && <AccountSettings openPhoneModal={openPhoneModal} openModal={openModal} />}
          {activeSection === 'privacy' && <PrivacySettings />}
        </div>
      </div>
      {showModal && <EmailChangeModal closeModal={closeModal} />}
      {showPhoneModal && <PhoneChangeModal closePhoneModal={closePhoneModal} />}
    </div>
  );
};

export default Settings;
