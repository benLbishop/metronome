import React from 'react';

import './Bar.scss';
import { BarData, NoteValue } from '../../types/barTypes';
import GroupingsContainer from '../GroupingsContainer';
import TimeSignature from '../TimeSignature';
import { constants } from '../../config/constants';
import SelectInput from '../SelectInput';

interface Props {
  bar: BarData;
  updateNoteValue(noteValue: NoteValue): void;
  updateGroupingBeats(idx: number, beats: number): void;
  updateGroupingNoteValue(idx: number, noteValue: NoteValue): void;
  remove(): void;
  addGrouping(): void;
  removeGrouping(idx: number): void;
  copy(): void;
}

// TODO: make button row a component?
const Bar: React.FC<Props> = (props: Props) => {
  const { noteValue, beats, groupings } = props.bar;

  return (
    <div className='bar'>
      <div className='barFieldSection'>
        <div className={'timeSignature'}>
          <p className='barBeat'>{props.bar.beats}</p>
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
        />
      </div>
      <div className='buttonRow'>
        <button onClick={props.addGrouping}>Add group</button>
        <button onClick={props.copy}>Copy</button>
        <button onClick={props.remove}>Delete</button>
      </div>
    </div>
  );
};

export default Bar;