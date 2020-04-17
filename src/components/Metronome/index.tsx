import React from 'react';

import './Metronome.scss';
import { BarData, Tempo } from '../../types/barTypes';

import Bar from '../Bar';
import SettingsBar from '../SettingsBar';

interface Props {
  bars: BarData[];
  tempo: Tempo;
  playing: boolean;
  togglePlay(): void;
  updateBPM(newBPM: number): void;
  updateNoteValue(newValue: number): void;
  addBar(): void;
  removeBar(idx: number): void;
  copyBar(idx: number): void;
  updateBarBeats(idx: number, newBeats: number): void;
  updateBarNoteValue(idx: number, newValue: number): void;
  addGrouping(barIdx: number): void;
  updateGroupingBeats(barIdx: number, groupingIdx: number, newBeats: number): void;
  updateGroupingNoteValue(barIdx: number, groupingIdx: number, newNoteValue: number): void;
}

const Metronome: React.FC<Props> = (props: Props) => {

  const getBarsDisplay = (): JSX.Element[] => {
    const bars: JSX.Element[] = props.bars.map((bar, idx) => {
      return <Bar
        key={`bar${bar.id}`}
        bar={bar}
        updateBeats={(beats: number) => props.updateBarBeats(idx, beats)}
        updateNoteValue={(noteInt: number) => props.updateBarNoteValue(idx, noteInt)}
        remove={() => props.removeBar(idx)}
        copy={() => props.copyBar(idx)}
        addGrouping={() => props.addGrouping(idx)}
        updateGroupingBeats={(groupingIdx: number, newBeats: number) => props.updateGroupingBeats(idx, groupingIdx, newBeats)}
        updateGroupingNoteValue={(groupingIdx: number, newNoteValue: number) => props.updateGroupingNoteValue(idx, groupingIdx, newNoteValue)}
      />;
    });
    return bars;
  };

  return (
    <div id='metronome'>
      <SettingsBar
        tempo={props.tempo}
        playing={props.playing}
        togglePlay={props.togglePlay}
        addBar={props.addBar}
        updateBPM={props.updateBPM}
        updateNoteValue={props.updateNoteValue}
      />
      <div className='barContainer'>
        {getBarsDisplay()}
      </div>
    </div>
  );
};

export default Metronome;