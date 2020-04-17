import { BarData } from '../types/barTypes';
import { convertNoteValueToInt } from './noteValue';

// TODO: figure out logic for matching grouping beats to bar beats
export const checkIfBarFull = (bar: BarData): boolean => {
    const targetNumBeats = bar.beats * convertNoteValueToInt(bar.noteValue);

    let groupingBeats = 0;
    bar.groupings.forEach(g => { groupingBeats += g.beats * convertNoteValueToInt(g.noteValue); });
    console.log('DEBUG: ', groupingBeats, targetNumBeats);
    return targetNumBeats === groupingBeats;
};