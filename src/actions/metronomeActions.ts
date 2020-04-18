import { createAction, ActionType } from 'typesafe-actions';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { convertNoteValueToInt } from '../lib/noteValue';
import { NoteValue, BarData } from '../types/barTypes';
import { RootState } from '../reducers';
import { playSound } from '../config/sounds';

// TODO: separate these into beat and grouping action files
const TOGGLE_PLAY = 'TOGGLE_PLAY';
const UPDATE_CUR_BEAT = 'UPDATE_CUR_BEAT';
const UPDATE_STARTING_BAR_IDX = 'UPDATE_STARTING_BAR_IDX';
const UPDATE_ENDING_BAR_IDX = 'UPDATE_ENDING_BAR_IDX';
const CANCEL_CUR_TIMEOUT = 'CANCEL_CUR_TIMEOUT';

export const metronomeActions = {
    togglePlay: createAction(TOGGLE_PLAY)(),
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
export const startSound = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const { curBarIdx, curBeat, curGroupingIdx, startingBarIdx, endingBarIdx } = getState().metronome;
        const { bars, tempo } = getState().song;
        const curBar = bars[curBarIdx];
        let noteDuration: number;

        const curGrouping = curBar.groupings[curGroupingIdx];
        playSound(curBeat, curGroupingIdx, curGrouping.subdivision);
        const noteValueRatio = convertNoteValueToInt(tempo.noteValue) / convertNoteValueToInt(curGrouping.noteValue);
        const subdivisionMultiplier = curGrouping.subdivision ? curGrouping.subdivision : 1;
        noteDuration = (60 / tempo.bpm) / (noteValueRatio * subdivisionMultiplier);

        // TODO: this is yucky
        const nextBeatInfo = calculateNextBeatInfo(
            curBeat,
            bars,
            curBarIdx,
            curGroupingIdx,
            startingBarIdx,
            endingBarIdx
        );

        const timeout = setTimeout(() => {
            dispatch(startSound());
        }, noteDuration * 1000);

        dispatch(metronomeActions.updateCurBeat(timeout, nextBeatInfo.newBeat, nextBeatInfo.newBarIdx, nextBeatInfo.newGroupingIdx));
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
            dispatch(metronomeActions.cancelCurTimeout());
        } else {
            dispatch(startSound());
        }
        dispatch(metronomeActions.togglePlay());
    };
};