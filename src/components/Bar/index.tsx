import React from 'react';

import { BarData, NoteValue } from '../../types/barTypes';
import GroupingsContainer from '../GroupingsContainer';
import { constants } from '../../config/constants';
import SelectInput from '../SelectInput';

interface Props {
  bar: BarData;
  updateNoteValue(noteValue: NoteValue): void;
  updateGroupingBeats(idx: number, beats: number): void;
  updateGroupingNoteValue(idx: number, noteValue: NoteValue): void;
  updateSubdivision(idx: number, newValue?: number): void;
  remove(): void;
  addGrouping(): void;
  removeGrouping(idx: number): void;
  copy(): void;
}

// TODO: make button row a component?
const Bar: React.FC<Props> = (props: Props) => {
  const { noteValue, beats, groupings } = props.bar;

  return (
    <div className='w-1/3 h-40 flex flex-col justify-even bg-blue-700 rounded border-2 border-teal-900 mx-5'>
      <div className='flex flex-2 flex-row items-stretch pb-2 border-b-2 border-b-red-600'>
        <div className='flex flex-1 flex-col items-center pr-2'>
          <p className='w-4/5 h-4 my-3 bg-white text-center'>{beats}</p>
          <SelectInput
          style={{ height: '20%' }}
          selectedValue={noteValue}
          values={constants.notes.NOTE_VALUE_LIST}
          updateValue={(newValue: NoteValue) => props.updateNoteValue(newValue)} />
        </div>
        <GroupingsContainer
          groupings={groupings}
          removeGrouping={props.removeGrouping}
          updateBeats={props.updateGroupingBeats}
          updateNoteValue={props.updateGroupingNoteValue}
          updateSubdivision={props.updateSubdivision}
        />
      </div>
      <div className='flex-1 flex flex-row justify-even'>
        <button onClick={props.addGrouping}>Add group</button>
        <button onClick={props.copy}>Copy</button>
        <button onClick={props.remove}>Delete</button>
      </div>
    </div>
  );
};

export default Bar;