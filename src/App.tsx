import React from 'react';
import './App.css';
import { Counter } from './features/counter/Counter';
import { Manufacturers } from './features/manufacturers/Manufacturers';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Counter />
        <Manufacturers />
      </header>
    </div>
  );
}

export default App;
