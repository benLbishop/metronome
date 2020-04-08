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
  curMeasure: number;
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

class Metronome extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      bars: [DEFAULT_BAR_DATA],
      bpm: 120,
      playing: false,
      curBeat: 1,
      curMeasure: 1
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

  playSound = () => {
    if (this.state.curBeat === 1) {
      highSound.play();
    } else {
      lowSound.play();
    }
    const beatTime = 1000 * 60 / this.state.bpm;
    // TODO: rework logic for this
    let newBeat = ((this.state.curBeat + 1) % (this.state.bars[0].beats + 1));
    let newMeasure = this.state.curMeasure;
    if (newBeat === 0) {
      newBeat = 1;
      newMeasure += 1;
    }
    const timeout = setTimeout(() => {
      this.playSound();
    }, beatTime);
    this.setState({
      timeout,
      curBeat: newBeat,
      curMeasure: newMeasure
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
      curBeat: 1,
      curMeasure: 1
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
      <div className='metronome'>
        {this.getBars()}
        <input type='text' value={this.state.bpm} onChange={this.handleBPMChange}/>
        <button onMouseDown={this.toggleSoundInterval}>Sound Test</button>
      </div>
    );
  }
}

export default Metronome;