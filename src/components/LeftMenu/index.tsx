import React from 'react';
import { Tempo, NoteValue } from '../../types/barTypes';
import SettingsBar from '../SettingsBar';

import './LeftMenu.scss';
import TextInput from '../TextInput';

interface Props {
  tempo: Tempo;
  playing: boolean;
  startingBarIdx: number;
  endingBarIdx: number;
  togglePlay(): void;
  updateBPM(newBPM: number): void;
  updateNoteValue(newValue: NoteValue): void;
  addBar(): void;
  updateStartingBarIdx(newIdx: number): void;
  updateEndingBarIdx(newIdx: number): void;
}

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
      <div className='bleh'>
        <TextInput value={props.startingBarIdx} updateValue={props.updateStartingBarIdx} />
        <TextInput value={props.endingBarIdx} updateValue={props.updateEndingBarIdx} />
      </div>
    </div>
  );
};

export default LeftMenu;