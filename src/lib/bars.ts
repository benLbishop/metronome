import { BarData } from '../types/barTypes';

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
    }
    return false;
};