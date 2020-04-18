import { BarData, GroupingData } from '../types/barTypes';
import { convertNoteValueToInt } from './noteValue';

// TODO: this is yucky
export const calculateNextBeatInfo = (
    curBeat: number,
    bars: BarData[],
    curBarIdx: number,
    curGroupingIdx: number,
    startingBarIdx: number,
    endingBarIdx: number
): {
    newBeat: number,
    newBarIdx: number,
    newGroupingIdx: number
} => {
    let newBeat = curBeat + 1;
    let newBarIdx = curBarIdx;
    let newGroupingIdx = curGroupingIdx;
    const curBar = bars[curBarIdx];
    const curGrouping = curBar.groupings[curGroupingIdx];
    const maxBeats = curGrouping.subdivision
        ? curGrouping.beats * curGrouping.subdivision
        : curGrouping.beats;
    if (newBeat >= maxBeats) {
        newBeat = 0;
        newGroupingIdx += 1;
        if (newGroupingIdx >= curBar.groupings.length) {
            newGroupingIdx = 0;
            newBarIdx += + 1;
            if (newBarIdx > endingBarIdx) {
                newBarIdx = startingBarIdx;
            }
        }
    }
    return {
        newBeat,
        newBarIdx,
        newGroupingIdx
    };
};

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