import React from 'react';
import TextInput from '../TextInput';

import './SettingsBar.scss';
import { Tempo } from '../../types/barTypes';
import { convertNoteValueToInt } from '../../lib/noteValue';

interface Props {
    tempo: Tempo;
    playing: boolean;
    togglePlay(): void;
    addBar(): void;
    updateBPM(bpm: number): void;
    updateNoteValue(newValue: number): void;
}

const SettingsBar: React.FC<Props> = (props: Props) => {
  const noteValueInt = convertNoteValueToInt(props.tempo.noteValue);
  return (
    <div className='settingsBar'>
      <button onClick={props.addBar}>Add Bar</button>
      <button className='playButton' onMouseDown={props.togglePlay}>{props.playing ? 'stop' : 'start'}</button>
      <div className='stdP'>BPM:</div>
      <TextInput value={props.tempo.bpm} updateValue={props.updateBPM}/>
      <TextInput value={noteValueInt} updateValue={props.updateNoteValue}/>
    </div>
  );
};

export default SettingsBar;