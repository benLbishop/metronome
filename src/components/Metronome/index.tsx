import React from 'react';
import { Howl } from 'howler';
import highClick from '../../res/sounds/highclick.wav';
import lowClick from '../../res/sounds/lowclick.wav';
import subdivClick from '../../res/sounds/subdiv.wav';
import './Metronome.scss';
import { BarData, NoteValue, Tempo } from '../../types/barTypes';
import { convertNoteValueToInt, convertIntToNoteValue } from '../../lib/noteValue';
import Bar from '../Bar';
import { makeJolt } from '../../config/songs';
import SettingsBar from '../SettingsBar';
import { barsHaveChanged } from '../../lib/bars';

interface Props {}

interface State {
  bars: BarData[];
  tempo: Tempo;
  curBarIdx: number;
  curBeat: number;
  playing: boolean;
  timeout?: NodeJS.Timeout;
  nextBarId: number;
}

// TODO: move to constants
const DEFAULT_BAR_DATA: BarData = {
  position: 0,
  beats: 4,
  noteValue: NoteValue.QUARTER
};

// TODO: idk where these go
const unemphasizedSound = new Howl({
  src: [lowClick],
  onloaderror: (id, err) => {
    console.log('HOWL err: ', id, err);
  },
  volume: 1
});

const emphasizedSound = new Howl({
  src: [highClick],
  onloaderror: (id, err) => {
    console.log('HOWL err: ', id, err);
  },
  volume: 1
});

const subdivSound = new Howl({
  src: [subdivClick],
  onloaderror: (id, err) => {
    console.log('HOWL err: ', id, err);
  },
  volume: 1
});

class Metronome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      bars: [{...DEFAULT_BAR_DATA, subdivision: 2}, {...DEFAULT_BAR_DATA, position: 1, subdivision: 3}],
      tempo: {
        bpm: 120,
        noteValue: NoteValue.QUARTER
      },
      playing: false,
      curBeat: 0,
      curBarIdx: 0,
      nextBarId: 2
    };
  }

  // TODO: move state out of this component (at least bars, curBeat, and curBarIdx) so I don't have to use shouldComponentUpdate
  shouldComponentUpdate(_nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
    const { playing, tempo, bars } = this.state;
    if (playing !== nextState.playing) {
      return true;
    }
    if (tempo.bpm !== nextState.tempo.bpm || tempo.noteValue !== nextState.tempo.noteValue) {
      return true;
    }
    if (barsHaveChanged(bars, nextState.bars)) {
      return true;
    }
    return false;
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
    const { curBeat, curBarIdx, bars } = this.state;
    let newBeat = curBeat + 1;
    let newBarIdx = curBarIdx;
    const curBar = bars[curBarIdx];

    const maxBeats = curBar.subdivision
      ? curBar.beats * curBar.subdivision
      : curBar.beats;
    if (newBeat >= maxBeats) {
      newBeat = 0;
      newBarIdx = (curBarIdx + 1) % bars.length;
    }
    this.setState({
      curBarIdx: newBarIdx,
      curBeat: newBeat
    });
  }

  playSound = () => {
    const { tempo, curBarIdx, curBeat } = this.state;
    const curBar = this.state.bars[curBarIdx];
    if (curBeat === 0) {
      emphasizedSound.play();
    } else if (curBar.subdivision && curBeat % curBar.subdivision !== 0) {
      subdivSound.play();
    } else {
      unemphasizedSound.play();
    }

    const noteValueRatio = convertNoteValueToInt(curBar.noteValue) / convertNoteValueToInt(tempo.noteValue);
    const subdivisionMultiplier = curBar.subdivision ? curBar.subdivision : 1;
    const beatDelaySecs = (60 / tempo.bpm) / (noteValueRatio * subdivisionMultiplier);
    this.updateBeat();
    const timeout = setTimeout(() => {
      this.playSound();
    }, beatDelaySecs * 1000);
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
      curBarIdx: 0
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
      tempo: {
        ...this.state.tempo,
        bpm: newBPM
      }
    });
  }

  getBars = (): JSX.Element[] => {
    const bars: JSX.Element[] = this.state.bars.map(bar => {
      const noteValueInt = convertNoteValueToInt(bar.noteValue);
      return <Bar
        key={`bar${bar.position}`}
        beats={bar.beats}
        noteValue={noteValueInt}
        updateBeats={(beats: number) => this.updateBeats(bar.position, beats)}
        updateNoteValue={(noteInt: number) => this.updateNoteValue(bar.position, noteInt)}
        remove={() => this.removeBar(bar.position)}
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
    const newBars = this.state.bars.slice();
    newBars.map(bar => {
      if (bar.position <= idx) {
        return;
      }
      bar.position -= 1;
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
          tempo={this.state.tempo}
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