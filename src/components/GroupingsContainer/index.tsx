import React from 'react';
import { GroupingData, NoteValue } from '../../types/barTypes';
import Grouping from '../Grouping';

import './GroupingsContainer.scss';

interface Props {
  groupings: GroupingData[];
  removeGrouping(idx: number): void;
  updateBeats(idx: number, newBeats: number): void;
  updateNoteValue(idx: number, newValue: NoteValue): void;
  updateSubdivision(idx: number, newValue?: number): void;
}

const GroupingsContainer: React.FC<Props> = (props: Props) => {
  const display: JSX.Element[] = props.groupings.map((grouping, idx) => {
    // TODO: groupings need id so this isn't using an idx key
    return (
      <Grouping
        key={`grouping${idx}`}
        grouping={grouping}
        remove={() => props.removeGrouping(idx)}
        updateBeats={(newBeats: number) => props.updateBeats(idx, newBeats)}
        updateNoteValue={(newValue: NoteValue) => props.updateNoteValue(idx, newValue)}
        updateSubdivision={(newValue?: number) => props.updateSubdivision(idx, newValue)}
      />
    );
  });
  return (
    <div className='groupingsContainer'>
      {display}
    </div>
  );
};

export default GroupingsContainer;