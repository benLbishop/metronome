import React from 'react';
import TextInput from '../TextInput';
import { NoteValue } from '../../types/barTypes';
import SelectInput from '../SelectInput';
import { constants } from '../../config/constants';

interface Props {
  className?: string;
  beats: number;
  noteValue: NoteValue;
  updateBeats(newBeats: number): void;
  updateNoteValue(newValue: NoteValue): void;
}

// TODO: is there a better way for this component to receive a className/other styling properties?
const TimeSignature: React.FC<Props> = (props: Props) => {
  const { beats, noteValue } = props;
  //@ts-ignore
  return (
    <div className={props.className}>
      <TextInput value={beats} updateValue={(newBeats: number) => props.updateBeats(newBeats)} />
      <SelectInput selectedValue={noteValue} values={constants.notes.NOTE_VALUE_LIST} updateValue={(newValue: NoteValue) => props.updateNoteValue(newValue)} />
    </div>
  );
};

export default TimeSignature;