import React, { useState } from 'react';
import CreateModal from '../../utils/CreateModal';
import img1 from '../../../public/hero.jpg';
import img2 from '../../../public/hero2.avif';
import img3 from '../../../public/hero3.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  
  const [selectedEvent, setSelectedEvent] = useState('Organised');
  const [showModal, setShowModal] = useState(false);

  const renderContent = () => {
    switch (selectedEvent) {
      case 'Organised':
        return {
          title: 'Start selling tickets',
          description: 'Create your first event',
          buttonLabel: 'Create Event',
          img: img1,
          nav:"false",
        };
      case 'Attending':
        return {
          title: 'Your attending events',
          description: 'View your tickets',
          buttonLabel: 'View Events',
          img: img2,
          nav:"true",
        };
      case 'Saved':
        return {
          title: 'Your saved events',
          description: 'Explore your saved events',
          buttonLabel: 'Get started',
          img: img3,
          nav:"true",
        };
      default:
        return {};
    }
  };

  const handleClick = (clickText) => {
    if (clickText === 'Create Event') {
      setShowModal(true);
    }
  };

  const { title, description, buttonLabel, img ,nav} = renderContent();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <aside className="w-full md:w-1/4 p-6 h-[500px] bg-white shadow-md mb-6 md:mb-0">
        <h2 className="text-lg font-semibold mb-6">📌 Highlights</h2>
        <div
          className="mb-4 border shadow-lg p-3 rounded-lg cursor-pointer"
          onClick={() => setSelectedEvent('Organised')}
        >
          <div className="font-semibold text-lg">Organised Events</div>
          <div className="text-4xl font-bold text-teal-500">{user?.eventsHosted?.total ? user?.eventsHosted?.total : 0}</div>
        </div>
        <div
          className="mb-4 border shadow-lg p-3 rounded-lg cursor-pointer"
          onClick={() => setSelectedEvent('Attending')}
        >
          <div className="font-semibold text-lg">Attending Events</div>
          <div className="text-4xl font-bold text-orange-500">{user?.eventsHosted?.attendedEvents ? user?.eventsHosted?.attendedEvents : 0}</div>
        </div>
        <div
          className="mb-4 border shadow-lg p-3 rounded-lg cursor-pointer"
          onClick={() => setSelectedEvent('Saved')}
        >
          <div className="font-semibold text-lg">Saved Events</div>
          <div className="text-4xl font-bold text-purple-500">{user?.savedEvents ? user?.savedEvents : 0}</div>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link  to={nav === "true" ? '/eventpage' : '#'} >
              <button
                className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-md"
                onClick={() => handleClick(buttonLabel)}
              >
                {buttonLabel}
              </button>
            </Link>
          </div>
          <div className="w-full md:w-auto">
            <img
              src={img}
              alt="Illustration"
              className="w-full md:w-72 h-auto"
            />
          </div>
        </div>
      </main>

      <CreateModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Home;
