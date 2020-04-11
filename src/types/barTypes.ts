export enum NoteValue {
    WHOLE = 'WHOLE',
    HALF = 'HALF',
    QUARTER = 'QUARTER',
    EIGHTH = 'EIGHTH',
    SIXTEENTH = 'SIXTEENTH'
}

// export enum Subdivision {

// }

export interface BarData {
    position: number;
    beats: number;
    noteValue: NoteValue;
    subdivision?: number;
}

export interface Tempo {
    bpm: number;
    noteValue: NoteValue;
}