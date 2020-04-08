import React from 'react';
import { Howl } from 'howler';
import highClick from '../../res/sounds/highclick.wav';
import lowClick from '../../res/sounds/lowclick.wav';
import './Metronome.scss';
import { BarData, NoteValue } from '../../types/barTypes';
import { convertNoteValueToInt, convertIntToNoteValue } from '../../lib/noteValue';
import Bar from '../Bar';

interface Props {}

interface State {
  bars: BarData[];
  bpm: number;
  curBar: number;
  curBeat: number;
  playing: boolean;
  timeout?: NodeJS.Timeout;
}

// TODO: move to constants
const DEFAULT_BAR_DATA: BarData = {
  id: 0,
  beats: 4,
  noteValue: NoteValue.QUARTER
};

// TODO: idk where these go
const lowSound = new Howl({
  src: [lowClick],
  onloaderror: (id, err) => {
    console.log('HOWL err: ', id, err);
  },
  volume: 1
});

const highSound = new Howl({
  src: [highClick],
  onloaderror: (id, err) => {
    console.log('HOWL err: ', id, err);
  },
  volume: 1
});

// TODO: remove
const makeJolt = (): BarData[] => {
  const data: BarData[] = [];
  for (let i = 0; i < 12; i++) {
    const id = i;
    let beats: number;
    if (i < 5) {
      beats = 5;
    } else if (i === 8) {
      beats = 5;
    } else {
      beats = 6;
    }
    data.push({
      id,
      beats,
      noteValue: NoteValue.QUARTER
    });
  }
  return data;
};

const makeJolt2 = (): BarData[] => {
  const data: BarData[] = [];
  for (let i = 0; i < 8; i++) {
    const id = i;
    let beats: number;
    if (i === 0 || i === 4) {
      beats = 7;
    } else if (i === 1 || i === 5) {
      beats = 8;
    } else if (i === 3) {
      beats = 10;
    } else {
      beats = 6;
    }
    data.push({
      id,
      beats,
      noteValue: NoteValue.QUARTER
    });
  }
  return data;
};

class Metronome extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      bars: makeJolt2(),
      bpm: 330,
      playing: false,
      curBeat: 0,
      curBar: 0
    };
  }

  // TODO: sort out id/idx thing for bars
  updateBeats = (idx: number, beats: number) => {
    const newBars = this.state.bars.slice();
    newBars[idx] = {
      ...newBars[idx],
      beats
    };
    this.setState({
      bars: newBars
    });
  }

  updateNoteValue = (idx: number, noteInt: number) => {
    const noteValue = convertIntToNoteValue(noteInt);
    const newBars = this.state.bars.slice();
    newBars[idx] = {
      ...newBars[idx],
      noteValue
    };
    this.setState({
      bars: newBars
    });
  }

  updateBeat = () => {
    // 1. take curBeat and find current measure
    const { curBeat, curBar, bars } = this.state;
    let newBeat = curBeat + 1;
    let newBar = curBar;
    if (newBeat >= bars[curBar].beats) {
      newBeat = 0;
      newBar = (curBar + 1) % bars.length;
    }
    this.setState({
      curBar: newBar,
      curBeat: newBeat
    });
  }

  playSound = () => {
    if (this.state.curBeat === 0) {
      highSound.play();
    } else {
      lowSound.play();
    }
    const beatTime = 1000 * 60 / this.state.bpm;
    this.updateBeat();
    const timeout = setTimeout(() => {
      this.playSound();
    }, beatTime);
    this.setState({
      timeout
    });
  }

  stopSound = () => {
    const { timeout } = this.state;
    if (!timeout) {
      return;
    }
    clearTimeout(timeout);
    this.setState({
      timeout: undefined,
      curBeat: 0,
      curBar: 0
    });
  }

  toggleStatePlaying = (state: State, _props: Props): State => ({
    ...state,
    playing: !state.playing
  });

  toggleSoundInterval = () => {
    if (this.state.playing) {
      this.stopSound();
    } else {
      this.playSound();
    }
    this.setState(this.toggleStatePlaying);
  }

  handleBPMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newBPM = parseInt(newText, 10);
    if (isNaN(newBPM)) {
      return;
    }
    this.setState({
      bpm: newBPM
    });
  }

  getBars = (): JSX.Element[] => {
    const bars: JSX.Element[] = this.state.bars.map(bar => {
      const noteValueInt = convertNoteValueToInt(bar.noteValue);
      return <Bar
        key={`bar${bar.id}`}
        id={bar.id}
        beats={bar.beats}
        noteValue={noteValueInt}
        updateBeats={(beats: number) => this.updateBeats(bar.id, beats)}
        updateNoteValue={(noteInt: number) => this.updateNoteValue(bar.id, noteInt)}
      />;
    });
    return bars;
  }
  render() {
    return (
      <div id='metronome'>
        <button onMouseDown={this.toggleSoundInterval}>{this.state.playing ? 'stop' : 'start'}</button>
        <input type='text' value={this.state.bpm} onChange={this.handleBPMChange}/>
        {this.getBars()}
      </div>
    );
  }
}

export default Metronome;