import React from 'react';
import { Tempo, NoteValue } from '../../types/barTypes';
import SettingsBar from '../SettingsBar';

import './LeftMenu.scss';
import TextInput from '../TextInput';
import { constants } from '../../config/constants';
import SelectInput from '../SelectInput';

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

// TODO: display start/end bar indices starting from 1
const LeftMenu: React.FC<Props> = (props) => {
  // TODO: move
  const getSongNames = (): string[] => {
    return constants.songs.SONG_LIST.map(song => song.name);
  };

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

export default LeftMenu;