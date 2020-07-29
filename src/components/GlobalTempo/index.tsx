import React from 'react';
import TextInput from '../TextInput';

import { Tempo, NoteValue } from '../../types/barTypes';
import SelectInput from '../SelectInput';
import { constants } from '../../config/constants';

interface Props {
    tempo: Tempo;
    updateBPM(bpm: number): void;
    updateNoteValue(newValue: NoteValue): void;
}

const GlobalTempo: React.FC<Props> = (props: Props) => {
  const className = 'w-1/2 text-center bg-transparent text-5xl';
  return (
    <div className='flex-1 flex flex-row justify-between'>
      <TextInput value={props.tempo.bpm} updateValue={props.updateBPM} className={className}/>
      <div className='flex-1 flex justify-center items-center text-3xl'>BPM</div>
      {/* <SelectInput
        className='flex-1'
        selectedValue={props.tempo.noteValue}
        values={constants.notes.NOTE_VALUE_LIST}
        updateValue={props.updateNoteValue}
      /> */}
    </div>
  );
};

export default GlobalTempo;