import { BarData, NoteValue, GroupData } from '../types/barTypes';

export const makeJolt = (): BarData[] => {
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
            position: i,
            noteValue: NoteValue.SIXTEENTH
        });
    }
    return data;
};

const makeJolt2 = (): BarData[] => {
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
            position: i
        });
    }
    return data;
};

export const makeElectricSunrise = (): BarData[] => {
    const groupings: GroupData[] = [];
    groupings.push({
        beats: 8,
        noteValue: NoteValue.DOTTED_EIGHTH
        // subdivision: 3
    });
    groupings.push({
        beats: 1,
        noteValue: NoteValue.EIGHTH,
        subdivision: 2
    });
    const bar: BarData = {
        groupings,
        position: 0,
        noteValue: NoteValue.EIGHTH,
        beats: 13
    };
    return [bar];
};