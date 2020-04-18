import React from 'react';
import { GroupingData, NoteValue } from '../../types/barTypes';

import './Grouping.scss';
import TimeSignature from '../TimeSignature';
import SelectInput from '../SelectInput';

interface Props {
  grouping: GroupingData;
  remove(): void;
  updateBeats(newBeats: number): void;
  updateNoteValue(newValue: NoteValue): void;
  updateSubdivision(newValue?: number): void;
}

const Grouping: React.FC<Props> = (props: Props) => {
  const { beats, noteValue, subdivision } = props.grouping;

  const updateSubdivision = (newValue: string) => {
    if (newValue === '') {
      props.updateSubdivision(undefined);
    }
    props.updateSubdivision(parseInt(newValue, 10));
  };
  return (
    <div className={'grouping'}>
      <TimeSignature
        className={'grouping'}
        textInputStyle={{ width: '80%', height: '20%', margin: '5% 0' }}
        noteValueStyle={{ height: '20%', width: '80%'}}
        beats={beats}
        noteValue={noteValue}
        updateBeats={props.updateBeats}
        updateNoteValue={props.updateNoteValue}
      />
      <SelectInput
          style={{ height: '20%', width: '80%' }}
          selectedValue={subdivision !== undefined ? subdivision.toString() : ''}
          values={['', '2', '3', '4', '5']}
          updateValue={updateSubdivision} />
      <button onClick={props.remove}>Remove</button>
    </div>
  );
};

export default Grouping;