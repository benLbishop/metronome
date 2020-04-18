import React from 'react';
import TextInput from '../TextInput';

import './SettingsBar.scss';
import { Tempo, NoteValue } from '../../types/barTypes';
import SelectInput from '../SelectInput';
import { constants } from '../../config/constants';

interface Props {
    tempo: Tempo;
    playing: boolean;
    togglePlay(): void;
    addBar(): void;
    updateBPM(bpm: number): void;
    updateNoteValue(newValue: NoteValue): void;
}

const SettingsBar: React.FC<Props> = (props: Props) => {
  return (
    <div className='settingsBar'>
      <div className='globalTempo'>
        <div className='stdP'>BPM:</div>
        <TextInput value={props.tempo.bpm} updateValue={props.updateBPM}/>
        <SelectInput selectedValue={props.tempo.noteValue} values={constants.notes.NOTE_VALUE_LIST} updateValue={props.updateNoteValue}/>
      </div>
      <button className='playButton' onMouseDown={props.togglePlay}>{props.playing ? 'stop' : 'start'}</button>
      <button onClick={props.addBar}>Add Bar</button>
    </div>
  );
};

export default SettingsBar;