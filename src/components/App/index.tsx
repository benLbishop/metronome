import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import './App.scss';
import Metronome from '../Metronome';
import { RootState } from '../../reducers';
import { BarData, Tempo, NoteValue } from '../../types/barTypes';
import { handleTogglePlay, handleUpdateEndingBarIdx, handleUpdateStartingBarIdx } from '../../actions/metronomeActions';
import LeftMenu from '../LeftMenu';
import { songActions, handleAddBar, handleRemoveBar } from '../../actions/songActions';

// TODO add testing
// TODO styling
// TODO: maybe some of the mapDispatchToProps could be moved to Bar? Idk if that's a rational structure
// TODO: try to figure out if I can combine logic (i.e. don't have updateBeats/updateValue for global tempo, bars, and groupings)
// TODO: add saving/loading songs functionality
// TODO: count ins
// TODO: key shortcuts
// TODO: double renders/things over rendering in general

interface Props {
  bars: BarData[];
  tempo: Tempo;
  playing: boolean;
  startingBarIdx: number;
  endingBarIdx: number;
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
  updateGroupingSubdivision(barIdx: number, groupingIdx: number, newValue?: number): void;
  updateStartingBarIdx(newIdx: number): void;
  updateEndingBarIdx(newIdx: number): void;
}

const App: React.FC<Props> = (props: Props) => {
  return (
    <div id='appInitialized'>
      <LeftMenu
        tempo={props.tempo}
        playing={props.playing}
        startingBarIdx={props.startingBarIdx}
        endingBarIdx={props.endingBarIdx}
        togglePlay={props.togglePlay}
        addBar={props.addBar}
        updateBPM={props.updateBPM}
        updateNoteValue={props.updateNoteValue}
        updateStartingBarIdx={props.updateStartingBarIdx}
        updateEndingBarIdx={props.updateEndingBarIdx}
      />
      <Metronome
        bars={props.bars}
        removeBar={props.removeBar}
        copyBar={props.copyBar}
        updateBarNoteValue={props.updateBarNoteValue}
        addGrouping={props.addGrouping}
        removeGrouping={props.removeGrouping}
        updateGroupingBeats={props.updateGroupingBeats}
        updateGroupingNoteValue={props.updateGroupingNoteValue}
        updateGroupingSubdivision={props.updateGroupingSubdivision}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const met = state.metronome;
  const song = state.song;
  return {
    bars: song.bars,
    tempo: song.tempo,
    playing: met.playing,
    startingBarIdx: met.startingBarIdx,
    endingBarIdx: met.endingBarIdx
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => {
  return {
    togglePlay: () => dispatch(handleTogglePlay()),
    updateBPM: (newBPM: number) => dispatch(songActions.updateBPM(newBPM)),
    updateNoteValue: (newValue: NoteValue) => dispatch(songActions.updateNoteValue(newValue)),
    updateStartingBarIdx: (newIdx: number) => dispatch(handleUpdateStartingBarIdx(newIdx)),
    updateEndingBarIdx: (newIdx: number) => dispatch(handleUpdateEndingBarIdx(newIdx)),
    addBar: () => dispatch(handleAddBar()),
    removeBar: (idx: number) => dispatch(handleRemoveBar(idx)),
    copyBar: (idx: number) => dispatch(songActions.copyBar(idx)),
    updateBarNoteValue: (idx: number, newValue: NoteValue) => dispatch(songActions.updateBarNoteValue(idx, newValue)),
    addGrouping: (barIdx: number) => dispatch(songActions.addGrouping(barIdx)),
    removeGrouping: (barIdx: number, groupingIdx: number) => dispatch(songActions.removeGrouping(barIdx, groupingIdx)),
    updateGroupingBeats: (barIdx: number, groupingIdx: number, newBeats: number) => dispatch(songActions.updateGroupingBeats(barIdx, groupingIdx, newBeats)),
    updateGroupingNoteValue: (barIdx: number, groupingIdx: number, newValue: NoteValue) => dispatch(songActions.updateGroupingNoteValue(barIdx, groupingIdx, newValue)),
    updateGroupingSubdivision: (barIdx: number, groupingIdx: number, newValue?: number) => dispatch(songActions.updateGroupingSubdivision(barIdx, groupingIdx, newValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
