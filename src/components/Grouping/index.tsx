import React from 'react';
import { GroupingData, NoteValue } from '../../types/barTypes';

import './Grouping.scss';
import TimeSignature from '../TimeSignature';

interface Props {
  grouping: GroupingData;
  remove(): void;
  updateBeats(newBeats: number): void;
  updateNoteValue(newValue: NoteValue): void;
}

const Grouping: React.FC<Props> = (props: Props) => {
  const { beats, noteValue } = props.grouping;
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
      <button onClick={props.remove}>Remove</button>
    </div>
  );
};

export default Grouping;