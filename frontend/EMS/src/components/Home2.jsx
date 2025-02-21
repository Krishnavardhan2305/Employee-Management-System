import React from 'react';
import '../assets/styles/Home2.css';
import Homee2 from '../assets/Images/home.jpg';

const Home2 = () => {
  return (
    <div className="Home2-main">
      {/* Left Section: Image */}
      <div className="Home2-Left">
        <img src={Homee2} alt="Header" className="home-image" />
      </div>

      {/* Right Section: Heading and Text */}
      <div className="Home2-Right">
        <div className="head1">
          <h1>Create Your Organization and Track Your Employees Effortlessly</h1>
        </div>
        <div className="head3">
          <h3>Performance Management Software that slashes 90% admin workload</h3>
        </div>
      </div>
    </div>
  );
};

export default Home2;
