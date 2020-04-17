import { createAction, ActionType } from 'typesafe-actions';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { convertNoteValueToInt, convertIntToNoteValue } from '../lib/noteValue';
import { NoteValue } from '../types/barTypes';
import { RootState } from '../reducers';
import { playSound } from '../config/sounds';

const TOGGLE_PLAY = 'TOGGLE_PLAY';
const UPDATE_BPM = 'UPDATE_BPM';
const UPDATE_CUR_BEAT = 'UPDATE_CUR_BEAT';
const ADD_BAR = 'ADD_BAR';
const REMOVE_BAR = 'REMOVE_BAR';
const COPY_BAR = 'COPY_BAR';
const ADD_GROUPING = 'ADD_GROUPING';

export const metronomeActions = {
    togglePlay: createAction(TOGGLE_PLAY)(),
    updateBPM: createAction(
        UPDATE_BPM,
        (newBPM: number) => ({ newBPM })
    )(),
    updateCurBeat: createAction(
        UPDATE_CUR_BEAT,
        (timeout: NodeJS.Timeout) => ({ timeout })
        )(),
    addBar: createAction(ADD_BAR)(),
    removeBar: createAction(
        REMOVE_BAR,
        (idx: number) => ({ idx })
    )(),
    copyBar: createAction(
        COPY_BAR,
        (idx: number) => ({ idx })
    )(),
    updateBarBeats: createAction(
        'UPDATE_BAR_BEATS', // TODO
        (idx: number, newBeats: number) => ({ idx, newBeats })
    )(),
    updateBarNoteValue: createAction(
        'UPDATE_BAR_NOTE_VALUE', // TODO
        (idx: number, newNoteValue: NoteValue) => ({ idx, newNoteValue })
    )(),
    addGrouping: createAction(
        ADD_GROUPING,
        (barIdx: number) => ({ barIdx })
    )(),
    updateGroupingBeats: createAction(
        'UPDATE_GROUPING_BEATS', // TODO
        (barIdx: number, groupingIdx: number, newBeats: number) => ({ barIdx, groupingIdx, newBeats })
    )(),
    updateGroupingNoteValue: createAction(
        'UPDATE_GROUPING_NOTE_VALUE', // TODO
        (barIdx: number, groupingIdx: number, newNoteValue: NoteValue) => ({ barIdx, groupingIdx, newNoteValue })
    )(),
    cancelCurTimeout: createAction('CANCEL_CUR_TIMEOUT')() // TODO
};

export type MetronomeAction = ActionType<typeof metronomeActions>;

export const startSound = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const { tempo, curBarIdx, bars, curBeat, curGroupingIdx } = getState().metronome;
        const curBar = bars[curBarIdx];
        let noteDuration: number;

        const curGrouping = curBar.groupings[curGroupingIdx];
        playSound(curGrouping, curBeat, curGroupingIdx, curGrouping.subdivision);
        const noteValueRatio = convertNoteValueToInt(tempo.noteValue) / convertNoteValueToInt(curGrouping.noteValue);
        const subdivisionMultiplier = curGrouping.subdivision ? curGrouping.subdivision : 1;
        noteDuration = (60 / tempo.bpm) / (noteValueRatio * subdivisionMultiplier);

        const timeout = setTimeout(() => {
            dispatch(startSound());
        }, noteDuration * 1000);
        dispatch(metronomeActions.updateCurBeat(timeout));
    };
};

export const parseBarNoteValueUpdate = (idx: number, newValue: number) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        // TODO: validation
        const newNoteValue = convertIntToNoteValue(newValue);
        dispatch(metronomeActions.updateBarNoteValue(idx, newNoteValue));
    };
};

export const parseGroupingNoteValueUpdate = (barIdx: number, groupingIdx: number, newValue: number) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        // TODO: validation
        const newNoteValue = convertIntToNoteValue(newValue);
        dispatch(metronomeActions.updateGroupingNoteValue(barIdx, groupingIdx, newNoteValue));
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