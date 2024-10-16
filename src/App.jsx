import React from 'react'
import LandingPage from './pages/LandingPage'
import { Routes ,Route , useLocation , Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from './components/Landing/Header'
import EventCreationModal from './components/Modals/EventCreationModal'
import Dashboard from './components/userProfile/Dashboard'
import Home from './components/userProfile/Home'
import Profile from './components/userProfile/Profile'
import Settings from './components/userProfile/Settings'
import EventPage from './components/Events/EventPage'
import EventInfo from './components/Events/EventInfo'
import UserDashboard from './components/userProfile/UserDashboard'
import PersonalInfo from './components/PersonalUserDashboard/PersonalInfo'
import History from './components/PersonalUserDashboard/History'
import SocialConnect from './components/PersonalUserDashboard/SocialConnect'

const App = () => {
  const location = useLocation();

  const showHeader = ['/', '/login', '/signup', '/eventpage'].includes(location.pathname);
  return (
    <>
    {showHeader && <Header />}
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/event' element={<EventCreationModal />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home"  element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/organizer/:organizerId/:eventId" element={<UserDashboard />} >
        <Route index element={<Navigate to="personal-info" />} />
        <Route path="personal-info"  element={<PersonalInfo />} />
        <Route path="history" element={<History />} />
        <Route path="social-connect" element={<SocialConnect />} />
      </Route>
      <Route path='/eventpage' element={<EventPage />} />
      <Route path="/event/:id" element={<EventInfo/>} />
    
    </Routes>
  </>
  )
}

export default App