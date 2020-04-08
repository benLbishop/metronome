import React from 'react';
import { Howl } from 'howler';
import highClick from '../../res/sounds/highclick.wav';
import lowClick from '../../res/sounds/lowclick.wav';
import './SoundTest.scss';

interface Props {}

interface State {
  beatsPerMeasure: number;
  noteValue: number;
  bpm: number;
  playing: boolean;
  timeoutId?: NodeJS.Timeout;
  curMeasure: number;
  curBeat: number;
}

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

class SoundTest extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      beatsPerMeasure: 4,
      noteValue: 4,
      bpm: 120,
      playing: false,
      curBeat: 1,
      curMeasure: 1
    };
  }

  playSound = () => {
    if (this.state.curBeat === 1) {
      highSound.play();
    } else {
      lowSound.play();
    }
    const timeout = 1000 * 60 / this.state.bpm;

    let newBeat = ((this.state.curBeat + 1) % (this.state.beatsPerMeasure + 1));
    let newMeasure = this.state.curMeasure;
    if (newBeat === 0) {
      newBeat = 1;
      newMeasure += 1;
    }
    const timeoutId = setTimeout(() => {
      this.playSound();
    }, timeout);
    this.setState({
      timeoutId,
      curBeat: newBeat,
      curMeasure: newMeasure
    });
  }

  stopSound = () => {
    const { timeoutId } = this.state;
    if (!timeoutId) {
      return;
    }
    clearTimeout(timeoutId);
    this.setState({
      timeoutId: undefined,
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

  handleBeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newBeats = parseInt(newText, 10);
    if (isNaN(newBeats)) {
      return;
    }
    this.setState({
      beatsPerMeasure: newBeats
    });
  }

  handleNoteValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newNoteValue = parseInt(newText, 10);
    if (isNaN(newNoteValue)) {
      return;
    }
    this.setState({
      noteValue: newNoteValue
    });
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

  render() {
    return (
      <div id='soundTestContainer'>
        <input type='text' value={this.state.beatsPerMeasure} onChange={this.handleBeatsChange}/>
        <input type='text' value={this.state.noteValue} onChange={this.handleNoteValueChange}/>
        <input type='text' value={this.state.bpm} onChange={this.handleBPMChange}/>
        <button onMouseDown={this.toggleSoundInterval}>Sound Test</button>
      </div>
    );
  }
}

export default SoundTest;