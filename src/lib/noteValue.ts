import { NoteValue } from '../types/barTypes';

// TODO: really lock down how the heck this works.
// when and how are the int values used?
// how should note values be changed? (probably dropdowns)
// how are dotted notes/triplets/etc handled?
export const convertNoteValueToInt = (value: NoteValue): number => {
    switch (value) {
        case NoteValue.WHOLE: {
            return 256;
        }
        case NoteValue.HALF: {
            return 128;
        }
        case NoteValue.QUARTER: {
            return 64;
        }
        case NoteValue.DOTTED_EIGHTH: {
            return 48;
        }
        case NoteValue.EIGHTH: {
            return 32;
        }
        case NoteValue.SIXTEENTH: {
            return 16;
        }
        default: {
            //TODO
            return 64;
        }
    }
};

export const convertIntToNoteValue = (num: number): NoteValue => {
    if (num === 256) {
        return NoteValue.WHOLE;
    }
    if (num === 128) {
        return NoteValue.HALF;
    }
    if (num === 64) {
        return NoteValue.QUARTER;
    }
    if (num === 48) {
        return NoteValue.DOTTED_EIGHTH;
    }
    if (num === 32) {
        return NoteValue.EIGHTH;
    }
    if (num === 16) {
        return NoteValue.SIXTEENTH;
    }
    // TODO
    return NoteValue.QUARTER;
};