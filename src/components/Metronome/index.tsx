import React from 'react';

import './Metronome.scss';
import { BarData, Tempo, NoteValue } from '../../types/barTypes';

import Bar from '../Bar';
import SettingsBar from '../SettingsBar';

interface Props {
  bars: BarData[];
  removeBar(idx: number): void;
  copyBar(idx: number): void;
  updateBarNoteValue(idx: number, newValue: NoteValue): void;
  addGrouping(barIdx: number): void;
  removeGrouping(barIdx: number, groupingIdx: number): void;
  updateGroupingBeats(barIdx: number, groupingIdx: number, newBeats: number): void;
  updateGroupingNoteValue(barIdx: number, groupingIdx: number, newValue: NoteValue): void;
  updateGroupingSubdivision(barIdx: number, groupingIdx: number, newValue?: number): void;
}

const Metronome: React.FC<Props> = (props: Props) => {

  const getBarsDisplay = (): JSX.Element[] => {
    const bars: JSX.Element[] = props.bars.map((bar, idx) => {
      return <Bar
        key={`bar${bar.id}`}
        bar={bar}
        remove={() => props.removeBar(idx)}
        copy={() => props.copyBar(idx)}
        updateNoteValue={(newVal: NoteValue) => props.updateBarNoteValue(idx, newVal)}
        addGrouping={() => props.addGrouping(idx)}
        removeGrouping={(groupingIdx: number) => props.removeGrouping(idx, groupingIdx)}
        updateGroupingBeats={(groupingIdx: number, newBeats: number) => props.updateGroupingBeats(idx, groupingIdx, newBeats)}
        updateGroupingNoteValue={(groupingIdx: number, newValue: NoteValue) => props.updateGroupingNoteValue(idx, groupingIdx, newValue)}
        updateSubdivision={(groupingIdx: number, newValue?: number) => props.updateGroupingSubdivision(idx, groupingIdx, newValue)}
      />;
    });
    return bars;
  };

  return (
    <div id='metronome'>
      {getBarsDisplay()}
    </div>
  );
};

export default Metronome;