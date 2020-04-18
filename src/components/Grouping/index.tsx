import React from 'react';
import { GroupingData, NoteValue } from '../../types/barTypes';

import './Grouping.scss';
import TimeSignature from '../TimeSignature';

interface Props {
  grouping: GroupingData;
  updateBeats(newBeats: number): void;
  updateNoteValue(newValue: NoteValue): void;
}

const Grouping: React.FC<Props> = (props: Props) => {
  const { beats, noteValue } = props.grouping;
  return (
    <TimeSignature
      className={'grouping'}
      textInputStyle={{ width: '80%', margin: '5% 0' }}
      beats={beats}
      noteValue={noteValue}
      updateBeats={props.updateBeats}
      updateNoteValue={props.updateNoteValue}
    />
  );
};

export default Grouping;