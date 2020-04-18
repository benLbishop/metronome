import React from 'react';

import Metronome from '../Metronome';
import LeftMenu from '../LeftMenu';

import './App.scss';

// TODO add testing
// TODO styling
// TODO: try to figure out if I can combine logic (i.e. don't have updateBeats/updateValue for global tempo, bars, and groupings)
// TODO: count ins
// TODO: key shortcuts
// TODO: double renders/things over rendering in general
// TODO: save songs

interface Props {}

const App: React.FC<Props> = (_props: Props) => {
  return (
    <div id='appInitialized'>
      <LeftMenu />
      <Metronome />
    </div>
  );
};

export default App;
