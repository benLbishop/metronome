import React from 'react';

import './Bar.scss';
import { BarData } from '../../types/barTypes';
import { convertNoteValueToInt } from '../../lib/noteValue';
import GroupingsContainer from '../GroupingsContainer';
import TimeSignature from '../TimeSignature';

interface Props {
  bar: BarData;
  updateBeats(beats: number): void;
  updateNoteValue(noteValue: number): void;
  updateGroupingBeats(idx: number, beats: number): void;
  updateGroupingNoteValue(idx: number, noteValue: number): void;
  remove(): void;
  addGrouping(): void;
  copy(): void;
}

const Bar: React.FC<Props> = (props: Props) => {
  const { noteValue, beats, groupings } = props.bar;
  const noteValueInt = convertNoteValueToInt(noteValue);

  return (
    <div className='bar'>
      <div className='barFieldSection'>
        <TimeSignature
          className={'timeSignature'}
          beats={beats}
          noteValueInt={noteValueInt}
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