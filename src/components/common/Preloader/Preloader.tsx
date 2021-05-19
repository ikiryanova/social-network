import React from 'react';

import preloader from '../../../assets/loading.gif';

import './preloader.css';

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <img src={preloader} alt="preloader" />
    </div>
  );
}

export default Preloader;