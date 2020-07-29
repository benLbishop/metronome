import React from 'react';
import TextInput from '../TextInput';

import './SettingsBar.scss';
import { Tempo, NoteValue } from '../../types/barTypes';
import SelectInput from '../SelectInput';
import { constants } from '../../config/constants';
import GlobalTempo from '../GlobalTempo';

interface Props {
    tempo: Tempo;
    playing: boolean;
    togglePlay(): void;
    updateBPM(bpm: number): void;
    updateNoteValue(newValue: NoteValue): void;
}

const SettingsBar: React.FC<Props> = (props: Props) => {
  const playButtonStyle = `
    flex-1
    ${props.playing ? 'bg-red-400' : 'bg-green-400'}
    rounded
    border-2
    text-5xl
    ${props.playing ? 'border-red-600' : 'border-green-600'}
  `;
  return (
    <div className='w-1/4 h-full flex items-stretch'>
        <GlobalTempo tempo={props.tempo} updateBPM={props.updateBPM} updateNoteValue={props.updateNoteValue}/>
        <button className={playButtonStyle} onMouseDown={props.togglePlay}>{props.playing ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default SettingsBar;