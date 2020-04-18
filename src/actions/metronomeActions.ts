import { createAction, ActionType } from 'typesafe-actions';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { convertNoteValueToInt } from '../lib/noteValue';
import { RootState } from '../reducers';
import { playSound } from '../config/sounds';
import { calculateNextBeatInfo } from '../lib/bar';

const METRONOME_STARTED = 'METRONOME_STARTED';
const METRONOME_STOPPED = 'METRONOME_STOPPED';
const UPDATE_CUR_BEAT = 'UPDATE_CUR_BEAT';
const UPDATE_STARTING_BAR_IDX = 'UPDATE_STARTING_BAR_IDX';
const UPDATE_ENDING_BAR_IDX = 'UPDATE_ENDING_BAR_IDX';

export const metronomeActions = {
    metronomeStarted: createAction(METRONOME_STARTED)(),
    metronomeStopped: createAction(METRONOME_STOPPED)(),
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
    )()
};

export type MetronomeAction = ActionType<typeof metronomeActions>;

// TODO: clean up
const incrementMetronome = () => {
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
            dispatch(incrementMetronome());
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

export const startMetronome = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>) => {
        dispatch(metronomeActions.metronomeStarted());
        dispatch(incrementMetronome()); // starts actually playing metronome
    };
};

// TODO: sort of unecessary if it just dispatches another function
export const stopMetronome = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>) => {
        dispatch(metronomeActions.metronomeStopped());
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