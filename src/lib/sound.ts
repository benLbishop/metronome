import highClick from '../../res/sounds/highclick.wav';

const sound = new Howl({
    src: [highClick],
    onloaderror: (id, err) => {
      console.log('HOWL err: ', id, err);
    },
    volume: 1
  });