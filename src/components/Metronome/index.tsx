import React from 'react';
import { Howl } from 'howler';
import highClick from '../../res/sounds/highclick.wav';
import lowClick from '../../res/sounds/lowclick.wav';
import './Metronome.scss';
import { BarData, NoteValue } from '../../types/barTypes';
import { convertNoteValueToInt, convertIntToNoteValue } from '../../lib/noteValue';
import Bar from '../Bar';
import { makeJolt } from '../../config/songs';
import SettingsBar from '../SettingsBar';

interface Props {}

interface State {
  bars: BarData[];
  bpm: number;
  curBar: number;
  curBeat: number;
  playing: boolean;
  timeout?: NodeJS.Timeout;
  nextBarId: number;
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
      bars: [DEFAULT_BAR_DATA, {...DEFAULT_BAR_DATA, id: 1}],
      bpm: 120,
      playing: false,
      curBeat: 0,
      curBar: 0,
      nextBarId: 2
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

  togglePlay = () => {
    if (this.state.playing) {
      this.stopSound();
    } else {
      this.playSound();
    }
    this.setState(this.toggleStatePlaying);
  }

  handleBPMChange = (newBPM: number) => {
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
        remove={() => this.removeBar(bar.id)}
      />;
    });
    return bars;
  }

  addBar = () => {
    const barAdder = (state: State, _props: Props): State => {
      const newBars = state.bars.slice();
      const newBar = {
        ...DEFAULT_BAR_DATA,
        id: state.nextBarId
      };
      newBars.push(newBar);
      return {
        ...state,
        bars: newBars,
        nextBarId: state.nextBarId + 1
      };
    };
    this.setState(barAdder);
  }

  removeBar = (idx: number) => {
    // TODO: this is goobed up because of idx/id issue
    const newBars = this.state.bars.slice();
    newBars.map(bar => {
      if (bar.id <= idx) {
        return;
      }
      bar.id -= 1;
    });
    newBars.splice(idx, 1);
    this.setState({
      bars: newBars
    });
  }

  render() {
    return (
      <div id='metronome'>
        <SettingsBar
          bpm={this.state.bpm}
          playing={this.state.playing}
          togglePlay={this.togglePlay}
          updateBPM={this.handleBPMChange}
        />
        <button onClick={this.addBar}>Add Bar</button>
        <div className='barContainer'>
          {this.getBars()}
        </div>
      </div>
    );
  }
}

export default Metronome;