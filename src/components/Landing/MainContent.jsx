import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger plugin
import logo from '../../../public/event_bg.avif';
import CreateModal from '../../utils/CreateModal';
import { useSelector } from 'react-redux';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const MainContent = () => {
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation(); // Track location changes

  // Refs for GSAP animation
  const mainRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const secondParaRef = useRef(null); // Ref for the second paragraph (scroll animation)
  const buttonRef = useRef(null);

  const handleClick = () => {
    setShowModal(true);
  };

  // GSAP animations for load and scroll
  const animate = () => {
    // Initial load animations
    gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });

    gsap.fromTo(headingRef.current, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 1.2 });

    gsap.fromTo(paragraphRef.current, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 1.2 });

    gsap.fromTo(buttonRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 });

    // Scroll animation for the second paragraph
    gsap.fromTo(
      secondParaRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: secondParaRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true, // Smooth animation on scroll
        },
      }
    );
  };

  useEffect(() => {
    // Reset opacity and animations
    gsap.set([mainRef.current, headingRef.current, paragraphRef.current, secondParaRef.current, buttonRef.current], { opacity: 0 });
    
    animate(); // Trigger animations
    
  }, [location.pathname]); // Trigger animation on location change

  return (
    <main ref={mainRef} className="relative h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={logo}
          alt="Event Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-black/60 to-purple-600 opacity-70"></div>
      </div>

      <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
        <h1 ref={headingRef} className="text-4xl font-sans md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent text-white">
          Welcome to EventSphere
        </h1>
        <p ref={paragraphRef} className="text-lg md:text-2xl mb-6 leading-relaxed">
          Your ultimate platform for hosting and attending events in Maharashtra.
        </p>
        <p ref={secondParaRef} className="text-lg md:text-2xl mb-10 leading-relaxed">
          Stay informed on the latest social and private events, enjoy exclusive deals, and never miss a moment.
        </p>
        {user ? (
          <button
            ref={buttonRef}
            className="inline-block bg-[#1DDB70] text-white py-4 px-8 text-lg md:text-xl font-semibold hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
            onClick={handleClick}
          >
            Create Event
          </button>
        ) : (
          <Link
            to={'signup'}
            ref={buttonRef}
            className="inline-block bg-[#1DDB70] text-white py-4 px-8 text-lg md:text-xl font-semibold hover:bg-green-600 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Create Event
          </Link>
        )}
        <p className="mt-6 text-sm md:text-base italic">
          Join the community and start your event journey today!
        </p>
      </div>
      <CreateModal show={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
};

export default MainContent;
