import { NoteValue, GroupingData, BarData } from '../types/barTypes';
import { ELECTRIC_SUNRISE, JOLT_INTRO, JOLT_MID } from './songs';
import { Song } from '../types/songTypes';

const DEFAULT_GROUPING_DATA: GroupingData = {
    beats: 4,
    noteValue: NoteValue.QUARTER
};

const DEFAULT_BAR_DATA: BarData = {
    id: 0,
    beats: 4,
    noteValue: NoteValue.QUARTER,
    groupings: [DEFAULT_GROUPING_DATA]
};

const DEFAULT_SONG: Song = {
    name: '',
    bars: [DEFAULT_BAR_DATA],
    tempo: {
        bpm: 120,
        noteValue: NoteValue.QUARTER
    }
};

export const constants = {
    bars: {
        DEFAULT_GROUPING_DATA,
        DEFAULT_BAR_DATA,
        DEFAULT_BARS: [DEFAULT_BAR_DATA],
        MAX_NUM_BARS: 256 // TODO: idk what this should be
    },
    notes: {
        MAX_NOTE_VALUE_INT: 256,
        //@ts-ignore // TODO - better way to generate this list
        NOTE_VALUE_LIST: Object.keys(NoteValue).map(k => NoteValue[k as any]).map(v => v as NoteValue)
    },
    songs: {
        DEFAULT_SONG,
        ELECTRIC_SUNRISE,
        JOLT_INTRO,
        JOLT_MID
    }
};