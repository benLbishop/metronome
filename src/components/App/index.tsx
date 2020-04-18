import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import './App.scss';
import Metronome from '../Metronome';
import { RootState } from '../../reducers';
import { BarData, Tempo, NoteValue } from '../../types/barTypes';
import { metronomeActions, handleTogglePlay } from '../../actions/metronomeActions';

// TODO add testing
// TODO styling
// TODO: maybe some of the mapDispatchToProps could be moved to Bar? Idk if that's a rational structure
// TODO: try to figure out if I can combine logic (i.e. don't have updateBeats/updateValue for global tempo, bars, and groupings)
// TODO: add saving/loading songs functionality
// TODO: add ability to start/loop metronome from a non-zero bar
// TODO: count ins
// TODO: key shortcuts

interface Props {
  bars: BarData[];
  tempo: Tempo;
  playing: boolean;
  togglePlay(): void;
  updateBPM(newBPM: number): void;
  updateNoteValue(newValue: NoteValue): void;
  addBar(): void;
  removeBar(idx: number): void;
  copyBar(idx: number): void;
  updateBarNoteValue(idx: number, newValue: NoteValue): void;
  addGrouping(barIdx: number): void;
  removeGrouping(barIdx: number, groupingIdx: number): void;
  updateGroupingBeats(barIdx: number, groupingIdx: number, newBeats: number): void;
  updateGroupingNoteValue(barIdx: number, groupingIdx: number, newValue: NoteValue): void;
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
    updateNoteValue: (newValue: NoteValue) => dispatch(metActs.updateNoteValue(newValue)),
    addBar: () => dispatch(metActs.addBar()),
    removeBar: (idx: number) => dispatch(metActs.removeBar(idx)),
    copyBar: (idx: number) => dispatch(metActs.copyBar(idx)),
    updateBarNoteValue: (idx: number, newValue: NoteValue) => dispatch(metActs.updateBarNoteValue(idx, newValue)),
    addGrouping: (barIdx: number) => dispatch(metActs.addGrouping(barIdx)),
    removeGrouping: (barIdx: number, groupingIdx: number) => dispatch(metActs.removeGrouping(barIdx, groupingIdx)),
    updateGroupingBeats: (barIdx: number, groupingIdx: number, newBeats: number) => dispatch(metActs.updateGroupingBeats(barIdx, groupingIdx, newBeats)),
    updateGroupingNoteValue: (barIdx: number, groupingIdx: number, newValue: NoteValue) => dispatch(metActs.updateGroupingNoteValue(barIdx, groupingIdx, newValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
