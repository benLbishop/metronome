import { BarData, GroupData } from '../types/barTypes';

export const barsHaveChanged = (oldBars: BarData[], newBars: BarData[]): boolean => {
    if (oldBars.length !== newBars.length) {
        return true;
    }
    for (let i = 0; i < oldBars.length; i++) {
        const ob = oldBars[i];
        const nb = newBars[i];
        if (ob.beats !== nb.beats) {
            return true;
        }
        if (ob.noteValue !== nb.noteValue) {
            return true;
        }
        if (ob.position !== nb.position) {
            return true;
        }
        if (groupingsHaveChanged(ob.groupings, nb.groupings)) {
            return true;
        }
    }
    return false;
};

const groupingsHaveChanged = (oldGroupings: GroupData[], newGroupings: GroupData[]): boolean => {
    if (oldGroupings.length !== newGroupings.length) {
        return true;
    }
    for (let i = 0; i < oldGroupings.length; i++) {
        const og = oldGroupings[i];
        const ng = newGroupings[i];
        if (og.beats !== ng.beats) {
            return true;
        }
        if (og.noteValue !== ng.noteValue) {
            return true;
        }
        if (og.position !== ng.position) {
            return true;
        }
    }
    return false;
};