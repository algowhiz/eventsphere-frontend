import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '/evnet_bg.jpg';
import nullImg from '/no-result-found.jpg';
import { MdOutlineNotListedLocation } from "react-icons/md";
import { RiVideoOnLine } from "react-icons/ri";
import useEventFilter from '../../utils/useEventFilter';
import Spinner from '../../utils/Spinner';
import AlertModal from '../../utils/AlertModal';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../store/user'; 
import {  useDispatch } from 'react-redux';

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { selectedFilter, filteredEvents, setSelectedFilter } = useEventFilter(events);
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('https://eventsphere-backend-neu9.onrender.com/api/event/events-fetch')
      .then(response => {
        setEvents(response.data);
        console.log(events);
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage('Your token Id has Been Expire Login again');
        setShowError(true);
        setLoading(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        dispatch(clearUser());
        naviagte('/login');
      });
  }, []);

  const handleErrorClose = () => {
    setShowError(false);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center mb-4 space-x-2 gap-3 mt-10">
        {['All', 'Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month', 'Next Month', 'This Year', 'Next Year'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded ${selectedFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <AlertModal
        message={errorMessage}
        type="error"
        show={showError}
        onClose={handleErrorClose}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <Spinner />
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => (
            <Link key={event._id} to={`/event/${event._id}`}>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-xl cursor-pointer">
                <div
                  className="relative bg-cover bg-center rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${event?.images[0]?.url || bgImage})`, height: '200px' }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                  <div className="relative z-10 p-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-[#22B0AF] rounded-full flex flex-col justify-center items-center w-12 h-12">
                        <p className="text-white font-bold text-lg">
                          {new Date(event.eventStartDateTime).toLocaleDateString('en-GB', { day: 'numeric' })}
                        </p>
                        <p className="text-white text-sm font-bold">
                          {new Date(event.eventStartDateTime).toLocaleDateString('en-GB', { month: 'short' })}
                        </p>
                      </div>
                      <div className="text-white flex items-center">
                        {event.meetingType === 'online' ? (
                          <div className="flex items-center gap-1">
                            <RiVideoOnLine size={24} />
                            <span>Online</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span>{event.venueDetails ? event.venueDetails.split(' ').slice(0, 2).join(' ') : <MdOutlineNotListedLocation size={24} />}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-black mt-4 hover:text-[#22B0AF]">{event.eventName}</h2>
                <p className="mt-2 font-bold text-black">{event.isFree ? 'Free' : `$${event.amount}`}</p>
                <p className="mt-2 text-xs font-bold text-black">{new Date(event?.eventStartDateTime).toLocaleString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 flex justify-center items-center">
            <img src={nullImg} alt="No events found" className="w-[50%] h-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;
