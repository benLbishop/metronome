import React from 'react';
import TextInput from '../TextInput';

interface Props {
  className?: string;
  beats: number;
  noteValueInt: number;
  updateBeats(newBeats: number): void;
  updateNoteValue(newValue: number): void;
}

// TODO: is there a better way for this component to receive a className/other styling properties?
const TimeSignature: React.FC<Props> = (props: Props) => {
  const { beats, noteValueInt } = props;
  return (
    <div className={props.className}>
      <TextInput value={beats} updateValue={(newBeats: number) => props.updateBeats(newBeats)} />
      <TextInput value={noteValueInt} updateValue={(newValue: number) => props.updateNoteValue(newValue)} />
    </div>
  );
};

export default TimeSignature;