import React from 'react'
import { Link } from "react-router-dom";
import HeroSection from './heros/HeroSection';
import Navbar from './heros/Navbar';


const HomePage = () => {
  return (
    <div>
      <div className="form-note-s2 text-center pt-4">
        {/* Already have an account?{" "}
        <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
          <strong>Sign in instead</strong>
        </Link> */}
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}

export default HomePage
