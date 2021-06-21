import React from 'react';
import './App.css';
import { Loader } from './features/manufacturers/Loader';

const App: React.FC = () => {
  return (
    <div className='container'>
      <h3 className='justify-content-center d-flex App'>
        Vehicle Manufacturers App
      </h3>
      <Loader />
    </div>
  );
};

export default App;
