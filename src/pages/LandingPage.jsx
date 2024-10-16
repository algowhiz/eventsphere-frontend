import React from 'react'
import MainContent from '../components/Landing/MainContent'
import WhyUs from '../components/Landing/WhyUs'
import Footer from '../components/Landing/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-serif">
    <MainContent />
    <WhyUs />
    <Footer />
  </div>
  )
}

export default LandingPage