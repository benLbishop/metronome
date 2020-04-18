import React from 'react';

import './Bar.scss';
import { BarData, NoteValue } from '../../types/barTypes';
import GroupingsContainer from '../GroupingsContainer';
import TimeSignature from '../TimeSignature';

interface Props {
  bar: BarData;
  updateBeats(beats: number): void;
  updateNoteValue(noteValue: NoteValue): void;
  updateGroupingBeats(idx: number, beats: number): void;
  updateGroupingNoteValue(idx: number, noteValue: NoteValue): void;
  remove(): void;
  addGrouping(): void;
  copy(): void;
}

// TODO: make button row a component?
const Bar: React.FC<Props> = (props: Props) => {
  const { noteValue, beats, groupings } = props.bar;

  return (
    <div className='bar'>
      <div className='barFieldSection'>
        <TimeSignature
          className={'timeSignature'}
          textInputStyle={{ width: '80%', margin: '10% 0' }}
          beats={beats}
          noteValue={noteValue}
          updateBeats={props.updateBeats}
          updateNoteValue={props.updateNoteValue}
        />
        <GroupingsContainer
          groupings={groupings}
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