import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Tempo, NoteValue } from '../../types/barTypes';
import SettingsBar from '../SettingsBar';
import TextInput from '../TextInput';
import { constants } from '../../config/constants';
import SelectInput from '../SelectInput';

import './LeftMenu.scss';
import { RootState } from '../../reducers';
import { songActions, handleAddBar, loadSong } from '../../actions/songActions';
import { handleTogglePlay, handleUpdateStartingBarIdx, handleUpdateEndingBarIdx } from '../../actions/metronomeActions';

interface Props {
  tempo: Tempo;
  playing: boolean;
  startingBarIdx: number;
  endingBarIdx: number;
  curSongName?: string;
  togglePlay(): void;
  updateBPM(newBPM: number): void;
  updateNoteValue(newValue: NoteValue): void;
  addBar(): void;
  updateStartingBarIdx(newIdx: number): void;
  updateEndingBarIdx(newIdx: number): void;
  loadSong(songId: string): void;
}

// TODO: move
const getSongNames = (): string[] => {
  return constants.songs.SONG_LIST.map(song => song.name);
};

// TODO: display start/end bar indices starting from 1
const LeftMenu: React.FC<Props> = (props) => {

  return (
    <div id='leftMenu'>
      <SettingsBar
        tempo={props.tempo}
        playing={props.playing}
        togglePlay={props.togglePlay}
        addBar={props.addBar}
        updateBPM={props.updateBPM}
        updateNoteValue={props.updateNoteValue}
      />
      <div className='metronomeBarBounds'>
        <TextInput value={props.startingBarIdx} updateValue={props.updateStartingBarIdx} />
        <TextInput value={props.endingBarIdx} updateValue={props.updateEndingBarIdx} />
      </div>
      <div className='songLoader'>
        <SelectInput
          selectedValue={props.curSongName ? props.curSongName : ''}
          values={['', ...getSongNames()]}
          updateValue={props.loadSong}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const met = state.metronome;
  const song = state.song;
  return {
    tempo: song.tempo,
    playing: met.playing,
    startingBarIdx: met.startingBarIdx,
    endingBarIdx: met.endingBarIdx,
    curSongName: song.name
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
    loadSong: (songId: string) => dispatch(loadSong(songId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);