import React from 'react';
import { Howl } from 'howler';
import highClick from '../../res/sounds/highclick.wav';
import './SoundTest.scss';

interface Props {}

interface State {
  beatsPerMeasure: number;
  noteType: number;
  bpm: number;
  playing: boolean;
  timeoutId?: NodeJS.Timeout;
}

const sound = new Howl({
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
      noteType: 4,
      bpm: 60,
      playing: false
    };
  }

  playSound = () => {
    sound.play();
    const timeout = 1000 * (this.state.bpm) / 60;
    const timeoutId = setTimeout(() => {
      this.playSound();
    }, timeout);
    this.setState({timeoutId});
  }

  stopSound = () => {
    const { timeoutId } = this.state;
    if (!timeoutId) {
      return;
    }
    clearTimeout(timeoutId);
    this.setState({timeoutId: undefined});
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

  render() {
    return (
      <div id='soundTestContainer'>
        <button onMouseDown={this.toggleSoundInterval}>Sound Test</button>
      </div>
    );
  }
}

export default SoundTest;