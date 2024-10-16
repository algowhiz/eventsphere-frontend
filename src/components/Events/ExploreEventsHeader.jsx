import React from 'react';
import banner from '../../../public/event-banner.jpg';

const ExploreEventsHeader = () => {
  return (
    <div className="bg-cover bg-center h-[70vh] flex items-center justify-center text-white" style={{ backgroundImage: `url(${banner})` }}>
      <div className="text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Discover Events For All The Things You Love</h1>
        <div className="flex flex-col sm:flex-row justify-center mt-4 space-y-2 sm:space-y-0 ">
          <input type="text" placeholder="Enter Location" className="p-2 text-black rounded-md sm:rounded-r-none sm:rounded-l-md w-full sm:w-auto border-0 outline-none" />
          <input type="text" placeholder="Search Event" className="p-2 text-black rounded-md sm:rounded-l-none sm:rounded-r-none w-full sm:w-auto border-0 outline-none" />
          <button className="p-2 bg-green-500 text-white rounded-md sm:rounded-l-none sm:rounded-r-md">Find Events</button>
        </div>
      </div>
    </div>
  );
};

export default ExploreEventsHeader;
