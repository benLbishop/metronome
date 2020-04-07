import React from 'react';
import { Howl } from 'howler';
import highClick from '../../res/sounds/highclick.wav';
import './SoundTest.scss';

interface Props {}

const sound = new Howl({
  src: [highClick],
  onloaderror: (id, err) => {
    console.log('HOWL err: ', id, err)
  },
  volume: 1
})

class SoundTest extends React.PureComponent<Props> {

  playSound() {
    sound.play();
  }

  render() {
    return (      
      <div id="soundTestContainer">
        <button onMouseDown={this.playSound}>Sound Test</button>
      </div>
    )
  }
}

export default SoundTest