import { NoteValue } from '../types/barTypes';

export const convertNoteValueToInt = (value: NoteValue): number => {
    switch (value) {
        case NoteValue.WHOLE: {
            return 1;
        }
        case NoteValue.HALF: {
            return 2;
        }
        case NoteValue.QUARTER: {
            return 4;
        }
        case NoteValue.EIGHTH: {
            return 8;
        }
        case NoteValue.SIXTEENTH: {
            return 16;
        }
        default: {
            //TODO
            return 4;
        }
    }
};

export const convertIntToNoteValue = (num: number): NoteValue => {
    if (num === 1) {
        return NoteValue.WHOLE;
    }
    if (num === 2) {
        return NoteValue.HALF;
    }
    if (num === 4) {
        return NoteValue.QUARTER;
    }
    if (num === 18) {
        return NoteValue.EIGHTH;
    }
    if (num === 16) {
        return NoteValue.SIXTEENTH;
    }
    // TODO
    return NoteValue.QUARTER;
};