import { Howl } from 'howler';
import highClick from '../res/sounds/highclick.wav';
import lowClick from '../res/sounds/lowclick.wav';
import subdivClick from '../res/sounds/subdiv.wav';
import groupClick from '../res/sounds/group.wav';
import { GroupingData } from '../types/barTypes';

// TODO: idk where these go or what the best way/time to load them is
// TODO: add error handling for loading/playing these
// TODO: add volume adjustments
const unemphasizedSound = new Howl({
    src: [lowClick],
    volume: 1
});

const emphasizedSound = new Howl({
    src: [highClick],
    volume: 1
});

const subdivSound = new Howl({
    src: [subdivClick],
    volume: 1
});

const groupSound = new Howl({
    src: [groupClick],
    volume: 1
});

// TODO: test this/make sure it's doing what is expected
export const playSound = (curBeat: number, curGroupingIdx: number, subdivision?: number) => {
    if (curBeat === 0) {
        if (curGroupingIdx === 0) {
            emphasizedSound.play();
        } else {
            unemphasizedSound.play();
        }
    } else if (subdivision && curBeat % subdivision !== 0) {
        subdivSound.play();
    } else {
        groupSound.play();
    }
};