import React from 'react';
import './App.scss';
import Metronome from '../Metronome';

const App: React.FC = () => {
  return (
    <div id='appInitialized'>
      <Metronome />
    </div>
  );
};

export default App;
