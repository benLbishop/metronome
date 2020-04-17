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
  addBar(): void;
  removeBar(idx: number): void;
  copyBar(idx: number): void;
  updateBarBeats(idx: number, newBeats: number): void;
  updateBarNoteValue(idx: number, newValue: number): void;
  addGrouping(barIdx: number): void;
  updateGroupingBeats(barIdx: number, groupingIdx: number, newBeats: number): void;
  updateGroupingNoteValue(barIdx: number, groupingIdx: number, newNoteValue: number): void;
}

interface State {
  timeout?: NodeJS.Timeout;
}

// TODO: convert to functional component
class Metronome extends React.Component<Props, State> {

  getBarsDisplay = (): JSX.Element[] => {
    const bars: JSX.Element[] = this.props.bars.map((bar, idx) => {
      return <Bar
        key={`bar${bar.id}`}
        bar={bar}
        updateBeats={(beats: number) => this.props.updateBarBeats(idx, beats)}
        updateNoteValue={(noteInt: number) => this.props.updateBarNoteValue(idx, noteInt)}
        remove={() => this.props.removeBar(idx)}
        copy={() => this.props.copyBar(idx)}
        addGrouping={() => this.props.addGrouping(idx)}
        updateGroupingBeats={(groupingIdx: number, newBeats: number) => this.props.updateGroupingBeats(idx, groupingIdx, newBeats)}
        updateGroupingNoteValue={(groupingIdx: number, newNoteValue: number) => this.props.updateGroupingNoteValue(idx, groupingIdx, newNoteValue)}
      />;
    });
    return bars;
  }

  render() {
    return (
      <div id='metronome'>
        <SettingsBar
          tempo={this.props.tempo}
          playing={this.props.playing}
          togglePlay={this.props.togglePlay}
          addBar={this.props.addBar}
          updateBPM={this.props.updateBPM}
        />
        <div className='barContainer'>
          {this.getBarsDisplay()}
        </div>
      </div>
    );
  }
}

export default Metronome;