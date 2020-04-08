import React from 'react';
import BarField from '../BarField';

import './Bar.scss';

interface Props {
  id: number;
  beats: number;
  noteValue: number;
  bpm?: number;
  updateBeats(beats: number): void;
  updateNoteValue(noteValue: number): void;
}

// TODO: convert to functional component
const Bar: React.FC<Props> = (props: Props) => (
  <div className='bar'>
    <BarField value={props.beats} updateValue={props.updateBeats}/>
    <BarField value={props.noteValue} updateValue={props.updateNoteValue}/>
  </div>
);

export default Bar;