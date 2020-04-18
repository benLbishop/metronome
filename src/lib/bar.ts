import { BarData, GroupingData } from '../types/barTypes';
import { convertNoteValueToInt } from './noteValue';

// TODO: figure out logic for matching grouping beats to bar beats
export const checkIfBarFull = (bar: BarData): boolean => {
    const targetNumBeats = bar.beats * convertNoteValueToInt(bar.noteValue);

    const groupingBeats = getGroupingsBeatSum(bar.groupings);
    console.log('DEBUG: ', groupingBeats, targetNumBeats);
    return targetNumBeats === groupingBeats;
};

export const getGroupingsBeatSum = (groupings: GroupingData[]): number => {
    return groupings.reduce((sum, grouping) => {
        return sum + (convertNoteValueToInt(grouping.noteValue) * grouping.beats);
    }, 0);
};