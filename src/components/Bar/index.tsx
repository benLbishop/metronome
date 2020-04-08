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
class Bar extends React.PureComponent<Props> {
  render() {
    return (
      <div className='bar'>
        <BarField value={this.props.beats} updateValue={this.props.updateBeats}/>
        <BarField value={this.props.noteValue} updateValue={this.props.updateNoteValue}/>
      </div>
    );
  }
}

export default Bar;