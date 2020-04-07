import React from 'react';
import { Howl } from 'howler';
import j from '../res/sounds/highclick.wav';

interface Props {}

const sound = new Howl({
  src: [j],
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
      <div>
        <button onMouseDown={this.playSound}>Sound Test</button>
      </div>
    )
  }
}

export default SoundTest