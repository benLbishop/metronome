export enum NoteValue {
    WHOLE = 'WHOLE',
    HALF = 'HALF',
    QUARTER = 'QUARTER',
    EIGHTH = 'EIGHTH',
    SIXTEENTH = 'SIXTEENTH',
    DOTTED_EIGHTH = 'DOTTED_EIGHTH' // TODO: make dotted function of some sort
}

// TODO: figure out why the heck my compiler was getting mad because of my index.ts in the types folder
// TODO: rename to grouping data
export interface GroupingData {
    beats: number;
    noteValue: NoteValue;
    subdivision?: number; // TODO: not sure if this is the right way to do this. Probably should use note value? What about triplets?
}

export interface BarData {
    id: number;
    beats: number;
    noteValue: NoteValue;
    groupings: GroupingData[];
    subdivision?: number;
}

export interface Tempo {
    bpm: number;
    noteValue: NoteValue;
}