import { createAction, ActionType } from 'typesafe-actions';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { convertNoteValueToInt } from '../lib/noteValue';
import { BarData } from '../types/barTypes';
import { RootState } from '../reducers';
import { playSound } from '../config/sounds';

const TOGGLE_PLAYING = 'TOGGLE_PLAY';
const UPDATE_CUR_BEAT = 'UPDATE_CUR_BEAT';
const UPDATE_STARTING_BAR_IDX = 'UPDATE_STARTING_BAR_IDX';
const UPDATE_ENDING_BAR_IDX = 'UPDATE_ENDING_BAR_IDX';
const CANCEL_CUR_TIMEOUT = 'CANCEL_CUR_TIMEOUT';

export const metronomeActions = {
    togglePlaying: createAction(TOGGLE_PLAYING)(),
    updateCurBeat: createAction(
        UPDATE_CUR_BEAT,
        (timeout: NodeJS.Timeout, newBeat: number, newBarIdx: number, newGroupingIdx: number) => ({
            newBeat,
            newBarIdx,
            newGroupingIdx,
            timeout
        })
    )(),
    updateStartingBarIdx: createAction(
        UPDATE_STARTING_BAR_IDX,
        (newIdx: number) => ({ newIdx })
    )(),
    updateEndingBarIdx: createAction(
        UPDATE_ENDING_BAR_IDX,
        (newIdx: number) => ({ newIdx })
    )(),
    cancelCurTimeout: createAction(CANCEL_CUR_TIMEOUT)()
};

export type MetronomeAction = ActionType<typeof metronomeActions>;

// TODO: clean up
const startMetronome = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const { curBarIdx, curBeat, curGroupingIdx, startingBarIdx, endingBarIdx } = getState().metronome;
        const { bars, tempo } = getState().song;
        const curBar = bars[curBarIdx];
        const curGrouping = curBar.groupings[curGroupingIdx];

        playSound(curBeat, curGroupingIdx, curGrouping.subdivision);

        // set up the timeout to call this function again based on the current
        const noteValueRatio = convertNoteValueToInt(curGrouping.noteValue) / convertNoteValueToInt(tempo.noteValue);
        const subdivisionFactor = curGrouping.subdivision ? curGrouping.subdivision : 1;
        const noteDuration = (60 / tempo.bpm) * noteValueRatio / subdivisionFactor;

        const timeout = setTimeout(() => {
            dispatch(startMetronome());
        }, noteDuration * 1000);

        // TODO: this is yucky
        const nextBeatInfo = calculateNextBeatInfo(
            curBeat,
            bars,
            curBarIdx,
            curGroupingIdx,
            startingBarIdx,
            endingBarIdx
        );

        dispatch(metronomeActions.updateCurBeat(timeout, nextBeatInfo.newBeat, nextBeatInfo.newBarIdx, nextBeatInfo.newGroupingIdx));
    };
};

// TODO: sort of unecessary if it just dispatches another function
export const stopMetronome = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>) => {
        dispatch(metronomeActions.cancelCurTimeout());
    };
};

// TODO: this is yucky
const calculateNextBeatInfo = (
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

export const handleTogglePlay = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const playing = getState().metronome.playing;
        if (playing) {
            dispatch(stopMetronome());
        } else {
            dispatch(startMetronome());
        }
        dispatch(metronomeActions.togglePlaying());
    };
};

export const handleUpdateStartingBarIdx = (newIdx: number) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const maxBarIdx = getState().song.bars.length - 1;
        if (newIdx > maxBarIdx) {
            return;
        }
        dispatch(metronomeActions.updateStartingBarIdx(newIdx));
    };
};

export const handleUpdateEndingBarIdx = (newIdx: number) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const maxBarIdx = getState().song.bars.length - 1;
        if (newIdx > maxBarIdx) {
            return;
        }
        dispatch(metronomeActions.updateEndingBarIdx(newIdx));
    };
};