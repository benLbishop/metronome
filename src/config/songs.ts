import { BarData, NoteValue, GroupingData } from '../types/barTypes';
import { Song } from '../types/songTypes';

const makeJoltBars = (): BarData[] => {
    const data: BarData[] = [];
    for (let i = 0; i < 12; i++) {
        let beats: number;
        if (i < 5) {
            beats = 5;
        } else if (i === 8) {
            beats = 5;
        } else {
            beats = 6;
        }
        data.push({
            beats,
            id: i.toString(),
            noteValue: NoteValue.SIXTEENTH,
            groupings: [{
                id: i.toString(),
                beats,
                noteValue: NoteValue.SIXTEENTH
            }]
        });
    }
    return data;
};

const makeJoltBars2 = (): BarData[] => {
    const data: BarData[] = [];
    for (let i = 0; i < 8; i++) {
        let beats: number;
        let noteValue: NoteValue = NoteValue.SIXTEENTH;
        if (i === 0 || i === 4) {
            beats = 7;
        } else if (i === 1 || i === 5) {
            beats = 8;
        } else if (i === 3) {
            beats = 5;
            noteValue = NoteValue.EIGHTH;
        } else {
            beats = 6;
        }
        data.push({
            beats,
            noteValue,
            id: i.toString(),
            groupings: [{
                id: i.toString(),
                beats,
                noteValue
            }]
        });
    }
    return data;
};

const makeElectricSunriseBars = (): BarData[] => {
    const groupings: GroupingData[] = [];
    groupings.push({
        id: '0',
        beats: 8,
        noteValue: NoteValue.DOTTED_EIGHTH
        // subdivision: 3
    });
    groupings.push({
        id: '1',
        beats: 1,
        noteValue: NoteValue.EIGHTH
        // subdivision: 2
    });
    const bar: BarData = {
        groupings,
        id: '0',
        noteValue: NoteValue.EIGHTH,
        beats: 13
    };
    return [bar];
};

export const ELECTRIC_SUNRISE: Song = {
    name: 'Electric Sunrise',
    bars: makeElectricSunriseBars(),
    tempo: {
        bpm: 131,
        noteValue: NoteValue.QUARTER
    }
};

export const JOLT_INTRO: Song = {
    name: 'Jolt [Intro]',
    bars: makeJoltBars(),
    tempo: {
        bpm: 100,
        noteValue: NoteValue.QUARTER
    }
};

export const JOLT_MID: Song = {
    name: 'Jolt [Middle]',
    bars: makeJoltBars2(),
    tempo: {
        bpm: 100,
        noteValue: NoteValue.QUARTER
    }
};