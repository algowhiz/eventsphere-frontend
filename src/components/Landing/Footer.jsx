import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2F3E5F] to-[#3F2B60] text-white py-12 text-center shadow-inner">
      <div className="bg-gradient-to-r from-[#2F3E5F] to-[#3F2B60] text-white  py-8 flex flex-col gap-5 justify-center items-center ">
        <h3 className="text-3xl md:text-6xl font-bold mb-4">Event ticketing just got easier</h3>
        <p className="text-xl md:text-3xl mb-4">Create your event in 2 minutes</p>
        <a href="#" className="bg-[#0EC35D] text-white  py-3 px-7 font-bold ">Get Started</a>
      </div>
      <div className="max-w-4xl mx-auto">
        <p className="mb-2">Contact us: <a href="mailto:info@kolhapurevents.com" className="text-blue-300 hover:underline">info@kolhapurevents.com</a></p>
        <p className="mb-4">&copy; 2024 Kolhapur Events. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mb-8">
          <a href="#" className="text-white hover:text-gray-200">Privacy Policy</a>
          <a href="#" className="text-white hover:text-gray-200">Terms of Service</a>
          <a href="#" className="text-white hover:text-gray-200">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
