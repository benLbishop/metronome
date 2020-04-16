import React from 'react';
import BarField from '../BarField';

import './Bar.scss';
import { BarData, GroupData } from '../../types/barTypes';
import { convertNoteValueToInt } from '../../lib/noteValue';

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

// TODO: convert to functional component
const Bar: React.FC<Props> = (props: Props) => {
  const { noteValue, beats, groupings } = props.bar;
  const noteValueInt = convertNoteValueToInt(noteValue);

  const getGroupingDisplay = (data: GroupData[]): JSX.Element[] => {
    const display: JSX.Element[] = data.map((grouping, idx) => {
      const groupingNoteValueInt = convertNoteValueToInt(grouping.noteValue);
      return (
        <div key={`bar${props.bar.id}grouping${idx}`} className='grouping'>
          <BarField value={grouping.beats} updateValue={(newBeats: number) => props.updateGroupingBeats(idx, newBeats)} />
          <BarField value={groupingNoteValueInt} updateValue={(newNoteValue: number) => props.updateGroupingNoteValue(idx, newNoteValue)} />
        </div>
      );
    });
    return display;
  };

  return (
    <div className='bar'>
      <div className='barMain'>
        <div className='timeSignature'>
          <BarField value={beats} updateValue={props.updateBeats}/>
          <BarField value={noteValueInt} updateValue={props.updateNoteValue}/>
        </div>
        <div className='groupingsContainer'>
          {getGroupingDisplay(groupings)}
        </div>
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