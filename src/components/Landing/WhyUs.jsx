import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img from '../../../public/zero-cost-1.png';
import img2 from '../../../public/Host-virtual-events-1.png';

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const sectionRef = useRef(null);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // First section animation (Image 1 and Text 1)
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse', // Replay animation when scrolling back
        markers: false,
      },
    });

    tl1.fromTo(
      textRef1.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2 }
    )
    .fromTo(
      imgRef1.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.2 },
      '-=1'
    );

    // Second section animation (Image 2 and Text 2), chained to first animation
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play reverse play reverse', // Replay animation when scrolling back
        markers: false,
      },
    });

    tl2.fromTo(
      textRef2.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2 }
    )
    .fromTo(
      imgRef2.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.2 },
      '-=1'
    );

    // Set up the scroll linking
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        tl1.play(); // Play the first animation
      },
      onLeaveBack: () => {
        tl1.reverse(); // Reverse the first animation when scrolling back
      },
      onEnterBack: () => {
        tl1.play(); // Replay the first animation on entering back
      },
      onLeave: () => {
        tl1.pause(); // Pause the animation if scrolling too far
      },
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      onEnter: () => {
        tl2.play(); // Play the second animation after the first completes
      },
      onLeaveBack: () => {
        tl2.reverse(); // Reverse the second animation when scrolling back
      },
      onEnterBack: () => {
        tl2.play(); // Replay the second animation on entering back
      },
      onLeave: () => {
        tl2.pause(); // Pause the animation if scrolling too far
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-r from-gray-100 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div ref={textRef1} className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-6">
            Zero Cost for Free Events
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Hosting a free event? You won’t pay a cent. Ever.
          </p>
        </div>
        <div ref={imgRef1} className="md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Free Events"
            className="w-full max-w-lg h-auto"
            style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsive images
          />
        </div>
      </div>

      <div className="max-w-6xl mt-8 mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div ref={imgRef2} className="md:w-1/2 flex justify-center">
          <img
            src={img2}
            alt="Host Virtual Events"
            className="w-full max-w-lg h-auto"
            style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsive images
          />
        </div>
        <div ref={textRef2} className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-6">
            Host Virtual Events Too
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Present memorable events online with our simple built-in conferencing software.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
