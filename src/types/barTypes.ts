export enum NoteValue {
    WHOLE = 'WHOLE',
    HALF = 'HALF',
    QUARTER = 'QUARTER',
    EIGHTH = 'EIGHTH',
    SIXTEENTH = 'SIXTEENTH',
    DOTTED_EIGHTH = 'DOTTED_EIGHTH' // TODO: make dotted function of some sort
}

// export enum Subdivision {

// }

export interface GroupData {
    beats: number;
    noteValue: NoteValue;
    subdivision?: number; // TODO: not sure if this is the right way to do this
}

export interface BarData {
    position: number;
    beats: number;
    noteValue: NoteValue;
    subdivision?: number;
    groupings?: GroupData[];
}

export interface Tempo {
    bpm: number;
    noteValue: NoteValue;
}