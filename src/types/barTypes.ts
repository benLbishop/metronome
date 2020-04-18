export enum NoteValue {
    WHOLE = 'WHOLE',
    HALF = 'HALF',
    QUARTER = 'QUARTER',
    EIGHTH = 'EIGHTH',
    DOTTED_EIGHTH = 'DOTTED_EIGHTH', // TODO: make dotted function of some sort
    SIXTEENTH = 'SIXTEENTH',
    THIRTY_SECOND = 'THIRTY_SECOND',
    SIXTY_FOURTH = 'SIXTY_FOURTH',
    ONE_TWENTY_EIGHTH = 'ONE_TWENTY_EIGHTH',
    TWO_FIFTY_SIXTH = 'TWO_FIFTY_SIXTH'
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
}

export interface Tempo {
    bpm: number;
    noteValue: NoteValue;
}