import { NoteValue } from '../types/barTypes';

export const constants = {
    notes: {
        MAX_NOTE_VALUE_INT: 256,
        //@ts-ignore // TODO - better way to generate this list
        NOTE_VALUE_LIST: Object.keys(NoteValue).map(k => NoteValue[k as any]).map(v => v as NoteValue)
    }
};