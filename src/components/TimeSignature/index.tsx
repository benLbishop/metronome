import React from 'react';
import BarField from '../BarField';

interface Props {
  className?: string;
  beats: number;
  noteValueInt: number;
  updateBeats(newBeats: number): void;
  updateNoteValue(newValue: number): void;
}

const TimeSignature: React.FC<Props> = (props: Props) => {
  const { beats, noteValueInt } = props;
  return (
    <div className={props.className}>
      <BarField value={beats} updateValue={(newBeats: number) => props.updateBeats(newBeats)} />
      <BarField value={noteValueInt} updateValue={(newValue: number) => props.updateNoteValue(newValue)} />
    </div>
  );
};

export default TimeSignature;