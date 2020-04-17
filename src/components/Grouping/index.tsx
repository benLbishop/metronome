import React from 'react';
import { GroupingData } from '../../types/barTypes';
import { convertNoteValueToInt } from '../../lib/noteValue';

import './Grouping.scss';
import TimeSignature from '../TimeSignature';

interface Props {
  grouping: GroupingData;
  updateBeats(newBeats: number): void;
  updateNoteValue(newValue: number): void;
}

const Grouping: React.FC<Props> = (props: Props) => {
  const { beats, noteValue } = props.grouping;
  const noteValueInt = convertNoteValueToInt(noteValue);
  return (
    <TimeSignature
      className={'grouping'}
      beats={beats}
      noteValueInt={noteValueInt}
      updateBeats={props.updateBeats}
      updateNoteValue={props.updateNoteValue}
    />
  );
};

export default Grouping;