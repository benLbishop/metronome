export enum NoteValue {
    WHOLE = 'WHOLE',
    HALF = 'HALF',
    QUARTER = 'QUARTER',
    EIGHTH = 'EIGHTH',
    SIXTEENTH = 'SIXTEENTH'
}

export interface BarData {
    position: number;
    beats: number;
    noteValue: NoteValue;
}

export interface Tempo {
    bpm: number;
    noteValue: NoteValue;
}