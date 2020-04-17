import React from 'react';
import { GroupData } from '../../types/barTypes';
import Grouping from '../Grouping';

import './GroupingsContainer.scss';

interface Props {
  groupings: GroupData[];
  updateBeats(idx: number, newBeats: number): void;
  updateNoteValue(idx: number, newValue: number): void;
}

const GroupingsContainer: React.FC<Props> = (props: Props) => {
  const display: JSX.Element[] = props.groupings.map((grouping, idx) => {
    // TODO: groupings need id so this isn't using an idx key
    return (
      <Grouping
        key={`grouping${idx}`}
        grouping={grouping}
        updateBeats={(newBeats: number) => props.updateBeats(idx, newBeats)}
        updateNoteValue={(newValue: number) => props.updateNoteValue(idx, newValue)}
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