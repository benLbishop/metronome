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
  const playButtonStyle = `
    w-5/6
    h-20
    ${props.playing ? 'bg-red-400' : 'bg-green-400'}
    rounded
    border-2
    text-5xl
    ${props.playing ? 'border-red-600' : 'border-green-600'}
  `;
  return (
    <div className='flex flex-1 flex-col items-center justify-between bg-blue-400'>
      <div className='flex flex-row'>
        <div className='bg-green-300'>BPM:</div>
        <TextInput value={props.tempo.bpm} updateValue={props.updateBPM}/>
        <SelectInput selectedValue={props.tempo.noteValue} values={constants.notes.NOTE_VALUE_LIST} updateValue={props.updateNoteValue}/>
      </div>
      <button className={playButtonStyle} onMouseDown={props.togglePlay}>{props.playing ? 'Stop' : 'Start'}</button>
      <button className='w-5/6 h-20 bg-orange-500 rounded border-2 border-orange-700' onClick={props.addBar}>Add Bar</button>
    </div>
  );
};

export default SettingsBar;