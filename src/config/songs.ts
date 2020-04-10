import { BarData, NoteValue } from '../types/barTypes';

export const makeJolt = (): BarData[] => {
    const data: BarData[] = [];
    for (let i = 0; i < 12; i++) {
        const id = i;
        let beats: number;
        if (i < 5) {
            beats = 5;
        } else if (i === 8) {
            beats = 5;
        } else {
            beats = 6;
        }
        data.push({
            id,
            beats,
            noteValue: NoteValue.QUARTER
        });
    }
    return data;
};

const makeJolt2 = (): BarData[] => {
    const data: BarData[] = [];
    for (let i = 0; i < 8; i++) {
        const id = i;
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
            id,
            beats,
            noteValue
        });
    }
    return data;
};