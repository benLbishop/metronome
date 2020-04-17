import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import './App.scss';
import Metronome from '../Metronome';
import { RootState } from '../../reducers';
import { BarData, Tempo } from '../../types/barTypes';
import {
  metronomeActions,
  handleTogglePlay,
  parseGroupingNoteValueUpdate,
  parseBarNoteValueUpdate,
  updateTempoNoteValue
} from '../../actions/metronomeActions';

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

const App: React.FC<Props> = (props: Props) => {
  return (
    <div id='appInitialized'>
      <Metronome {...props}/>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const met = state.metronome;
  return {
    bars: met.bars,
    tempo: met.tempo,
    playing: met.playing
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => {
  const metActs = metronomeActions;
  return {
    togglePlay: () => dispatch(handleTogglePlay()),
    updateBPM: (newBPM: number) => dispatch(metActs.updateBPM(newBPM)),
    updateNoteValue: (newValue: number) => dispatch(updateTempoNoteValue(newValue)),
    addBar: () => dispatch(metActs.addBar()),
    removeBar: (idx: number) => dispatch(metActs.removeBar(idx)),
    copyBar: (idx: number) => dispatch(metActs.copyBar(idx)),
    updateBarBeats: (idx: number, newBeats: number) => dispatch(metActs.updateBarBeats(idx, newBeats)),
    updateBarNoteValue: (idx: number, newValue: number) => dispatch(parseBarNoteValueUpdate(idx, newValue)),
    addGrouping: (barIdx: number) => dispatch(metActs.addGrouping(barIdx)),
    updateGroupingBeats: (barIdx: number, groupingIdx: number, newBeats: number) => dispatch(metActs.updateGroupingBeats(barIdx, groupingIdx, newBeats)),
    updateGroupingNoteValue: (barIdx: number, groupingIdx: number, newValue: number) => dispatch(parseGroupingNoteValueUpdate(barIdx, groupingIdx, newValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
