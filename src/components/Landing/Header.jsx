import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/user';
import { IoAddCircleSharp } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import CreateModal from '../../utils/CreateModal';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    dispatch(clearUser());
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <header className={`fixed  overflow-x-hidden w-full max-w-[100vw] p-4 transition-shadow duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'} z-40`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to='/'>
            <div className={`text-2xl font-semibold font-mono ${scrolled ? 'text-gray-800' : 'text-white'}`}>EventSphere</div>
          </Link>
          <Link to='/eventpage' className={`md:ml-10 font-bold ${scrolled ? 'text-gray-800' : 'text-white'} hidden md:block`}>
            Explore Event
          </Link>
        </div>
        <div className="z-50 md:hidden">
          <button onClick={toggleMenu} className={`focus:outline-none ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className="hidden md:flex items-center">
          {user && user._id ? (
            <div className='flex items-center'>
              <span className={`mx-2 font-semibold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                {user.name ? <Link to='/dashboard/home'>Greetings! {user.name}</Link> : "Greetings! Sign In"}
              </span>
              <p className={`flex cursor-pointer items-center ${scrolled ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' : 'bg-transparent text-white'} p-2 mx-2 font-semibold rounded-lg transition duration-300 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-400`} onClick={handleClick}>
                <IoAddCircleSharp size={20} className="mr-1" /> Create Event
              </p>
              <button onClick={handleLogout} className={`p-2 mx-2 font-semibold rounded-lg transition duration-300 ${scrolled ? 'bg-gradient-to-r from-red-400 to-red-500 text-white' : 'bg-transparent text-white hover:bg-gradient-to-r hover:from-red-300 hover:to-red-400'}`}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className={`p-2 px-4 mx-2 font-semibold rounded-lg transition duration-300 ${scrolled ? 'bg-blue-500 text-white' : 'bg-transparent text-white hover:bg-blue-400'}`}>
                Login
              </Link>
              <Link to="/signup" className={`p-2 px-4 mx-2 font-semibold rounded-lg transition duration-300 ${scrolled ? 'bg-blue-500 text-white' : 'bg-transparent text-white hover:bg-blue-400'}`}>
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed overflow-x-hidden inset-0 bg-black bg-opacity-75 z-40 flex flex-col items-center justify-center md:hidden transition-opacity duration-300 ease-in-out">
          <nav className="flex flex-col items-center">
            {user && user._id ? (
              <>

                <Link to='/dashboard/home' className="text-white text-lg mb-4" onClick={toggleMenu}><span className="text-white text-2xl mb-4">{user.name ? `Greetings! ${user.name}` : "Greetings! Sign In"}</span></Link>
                <p className="text-white text-lg mb-4 flex items-center" onClick={() => { toggleMenu(); handleClick(); }}>
                  <IoAddCircleSharp size={20} className="mr-1" /> Create Event
                </p>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="text-white text-lg">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white text-lg mb-4" onClick={toggleMenu}>Login</Link>
                <Link to="/signup" className="text-white text-lg mb-4" onClick={toggleMenu}>Signup</Link>
              </>
            )}
            <Link to="/eventpage" className="text-white text-lg m-3" onClick={toggleMenu}>Explore Event</Link>
          </nav>
        </div>
      )}

      <CreateModal show={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
};

export default Header;
