import { Howl } from 'howler';
import highClick from '../res/sounds/highclick.wav';
import lowClick from '../res/sounds/lowclick.wav';
import subdivClick from '../res/sounds/subdiv.wav';
import groupClick from '../res/sounds/group.wav';
import { GroupingData } from '../types/barTypes';

// TODO: idk where these go or what the best way/time to load them is
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

export const playSound = (curGrouping: GroupingData, curBeat: number, curGroupingIdx: number, subdivision?: number) => {
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