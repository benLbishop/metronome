import React from 'react';
import BarField from '../BarField';

import './SettingsBar.scss';

interface Props {
    bpm: number;
    playing: boolean;
    togglePlay(): void;
    updateBPM(bpm: number): void;
}

const SettingsBar: React.FC<Props> = (props: Props) => {
  return (
    <div className='settingsBar'>
      <button className='playButton' onMouseDown={props.togglePlay}>{props.playing ? 'stop' : 'start'}</button>
      <div className='stdP'>BPM:</div>
      <BarField value={props.bpm} updateValue={props.updateBPM}/>
    </div>
  );
};

export default SettingsBar;