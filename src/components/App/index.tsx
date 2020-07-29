import React from 'react';

import Metronome from '../Metronome';
import LeftMenu from '../LeftMenu';

// TODO add testing
// TODO styling
// TODO: try to figure out if I can combine logic (i.e. don't have updateBeats/updateValue for global tempo, bars, and groupings)
// TODO: count ins
// TODO: key shortcuts
// TODO: double renders/things over rendering in general
// TODO: save songs
// TODO: move components to files instead of folders

interface Props {}

const App: React.FC<Props> = (_props: Props) => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <LeftMenu />
      <Metronome />
    </div>
  );
};

export default App;
