import React from 'react';
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from 'framer-motion'; // For animation
import { useOutletContext } from 'react-router-dom';

const SocialConnect = () => {

  const { user } = useOutletContext();
  const { facebook, instagram, linkedin } = user.socialLinks || {};

  const socialIcons = [
    { platform: 'Facebook', link: facebook, icon: <FaFacebook />, gradient: 'bg-gradient-to-r from-[#59CDE9] to-[#0A2A88]' },
    { platform: 'Instagram', link: instagram, icon: <GrInstagram />, gradient: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]' },
    { platform: 'X', link: null, icon: <FaXTwitter />, gradient: 'bg-gradient-to-r from-[#152331] to-[#000000]' },
    { platform: 'LinkedIn', link: linkedin, icon: <FaLinkedinIn />, gradient: 'bg-gradient-to-r from-[#004680] to-[#4484BA]' },
  ];

  const allLinksEmpty = !facebook && !instagram && !linkedin;

  return (
    <div className="p-6 h-auto rounded-lg ">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 mt-7">Social Connect</h2>
      {allLinksEmpty ? (
        <div className="flex flex-col  items-center justify-center h-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-6xl text-gray-400 mb-4"
          >
            😔
          </motion.div>
          <p className="text-xl font-medium text-gray-600">No link available to connect !!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {socialIcons.map(({ platform, link, icon, gradient }) => (
            link && (
              <div
                key={platform}
                className={`flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${gradient} cursor-pointer `}
              >
                <div className="text-4xl mb-2 text-white">
                  <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                    {icon}
                  </a>
                </div>
                <p className="text-lg font-medium text-white">{platform}</p>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialConnect;
