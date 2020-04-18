import { NoteValue } from '../types/barTypes';
import { constants } from '../config/constants';

// TODO: really lock down how the heck this works.
// when and how are the int values used?
// how should note values be changed? (probably dropdowns)
// how are dotted notes/triplets/etc handled?
export const convertNoteValueToInt = (value: NoteValue): number => {
    const maxVal = constants.notes.MAX_NOTE_VALUE_INT;
    switch (value) {
        case NoteValue.WHOLE: {
            return maxVal;
        }
        case NoteValue.HALF: {
            return maxVal / 2;
        }
        case NoteValue.QUARTER: {
            return maxVal / 4;
        }
        case NoteValue.EIGHTH: {
            return maxVal / 8;
        }
        case NoteValue.DOTTED_EIGHTH: {
            return (maxVal / 8) * 1.5;
        }
        case NoteValue.SIXTEENTH: {
            return maxVal / 16;
        }
        case NoteValue.THIRTY_SECOND: {
            return maxVal / 32;
        }
        case NoteValue.SIXTY_FOURTH: {
            return maxVal / 64;
        }
        case NoteValue.ONE_TWENTY_EIGHTH: {
            return maxVal / 128;
        }
        case NoteValue.TWO_FIFTY_SIXTH: {
            return maxVal / 256;
        }
        default: {
            // TODO
            throw Error('unrecognized noteValue submitted');
        }
    }
};

export const convertIntToNoteValue = (num: number): NoteValue => {
    const maxVal = constants.notes.MAX_NOTE_VALUE_INT;
    if (num === maxVal) {
        return NoteValue.WHOLE;
    }
    if (num === maxVal / 2) {
        return NoteValue.HALF;
    }
    if (num === maxVal / 4) {
        return NoteValue.QUARTER;
    }
    if (num === (maxVal / 8) * 1.5) {
        return NoteValue.DOTTED_EIGHTH;
    }
    if (num === maxVal / 8) {
        return NoteValue.EIGHTH;
    }
    if (num === maxVal / 16) {
        return NoteValue.SIXTEENTH;
    }
    if (num === maxVal / 32) {
        return NoteValue.THIRTY_SECOND;
    }
    if (num === maxVal / 64) {
        return NoteValue.SIXTY_FOURTH;
    }
    if (num === maxVal / 128) {
        return NoteValue.ONE_TWENTY_EIGHTH;
    }
    if (num === maxVal / 256) {
        return NoteValue.TWO_FIFTY_SIXTH;
    }
    throw Error('submitted value does not correspond to a note value');
};