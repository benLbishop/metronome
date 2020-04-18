import { createAction, ActionType } from 'typesafe-actions';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { convertNoteValueToInt } from '../lib/noteValue';
import { NoteValue } from '../types/barTypes';
import { RootState } from '../reducers';
import { playSound } from '../config/sounds';

// TODO: separate these into beat and grouping action files
const TOGGLE_PLAY = 'TOGGLE_PLAY';
const UPDATE_BPM = 'UPDATE_BPM';
const UPDATE_NOTE_VALUE = 'UPDATE_NOTE_VALUE';
const UPDATE_CUR_BEAT = 'UPDATE_CUR_BEAT';
const UPDATE_STARTING_BAR_IDX = 'UPDATE_STARTING_BAR_IDX';
const UPDATE_ENDING_BAR_IDX = 'UPDATE_ENDING_BAR_IDX';
const ADD_BAR = 'ADD_BAR';
const REMOVE_BAR = 'REMOVE_BAR';
const COPY_BAR = 'COPY_BAR';
const UPDATE_BAR_NOTE_VALUE = 'UPDATE_BAR_NOTE_VALUE';
const ADD_GROUPING = 'ADD_GROUPING';
const REMOVE_GROUPING = 'REMOVE_GROUPING';
const UPDATE_GROUPING_BEATS = 'UPDATE_GROUPING_BEATS';
const UPDATE_GROUPING_NOTE_VALUE = 'UPDATE_GROUPING_NOTE_VALUE';
const UPDATE_GROUPING_SUBDIVISION = 'UPDATE_GROUPING_SUBDIVISION';
const CANCEL_CUR_TIMEOUT = 'CANCEL_CUR_TIMEOUT';

export const metronomeActions = {
    togglePlay: createAction(TOGGLE_PLAY)(),
    updateBPM: createAction(
        UPDATE_BPM,
        (newBPM: number) => ({ newBPM })
    )(),
    updateNoteValue: createAction(
        UPDATE_NOTE_VALUE,
        (newValue: NoteValue) => ({ newValue })
    )(),
    updateCurBeat: createAction(
        UPDATE_CUR_BEAT,
        (timeout: NodeJS.Timeout) => ({ timeout })
    )(),
    updateStartingBarIdx: createAction(
        UPDATE_STARTING_BAR_IDX,
        (newIdx: number) => ({ newIdx })
    )(),
    updateEndingBarIdx: createAction(
        UPDATE_ENDING_BAR_IDX,
        (newIdx: number) => ({ newIdx })
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
    updateBarNoteValue: createAction(
        UPDATE_BAR_NOTE_VALUE,
        (idx: number, newNoteValue: NoteValue) => ({ idx, newNoteValue })
    )(),
    addGrouping: createAction(
        ADD_GROUPING,
        (barIdx: number) => ({ barIdx })
    )(),
    removeGrouping: createAction(
        REMOVE_GROUPING,
        (barIdx: number, groupingIdx: number) => ({ barIdx, groupingIdx })
    )(),
    updateGroupingBeats: createAction(
        UPDATE_GROUPING_BEATS,
        (barIdx: number, groupingIdx: number, newBeats: number) => ({ barIdx, groupingIdx, newBeats })
    )(),
    updateGroupingNoteValue: createAction(
        UPDATE_GROUPING_NOTE_VALUE,
        (barIdx: number, groupingIdx: number, newNoteValue: NoteValue) => ({ barIdx, groupingIdx, newNoteValue })
    )(),
    updateGroupingSubdivision: createAction(
        UPDATE_GROUPING_SUBDIVISION,
        (barIdx: number, groupingIdx: number, newValue?: number) => ({ barIdx, groupingIdx, newValue })
    )(),
    cancelCurTimeout: createAction(CANCEL_CUR_TIMEOUT)()
};

export type MetronomeAction = ActionType<typeof metronomeActions>;

// TODO: clean up
export const startSound = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const { tempo, curBarIdx, bars, curBeat, curGroupingIdx } = getState().metronome;
        const curBar = bars[curBarIdx];
        let noteDuration: number;

        const curGrouping = curBar.groupings[curGroupingIdx];
        playSound(curBeat, curGroupingIdx, curGrouping.subdivision);
        const noteValueRatio = convertNoteValueToInt(tempo.noteValue) / convertNoteValueToInt(curGrouping.noteValue);
        const subdivisionMultiplier = curGrouping.subdivision ? curGrouping.subdivision : 1;
        noteDuration = (60 / tempo.bpm) / (noteValueRatio * subdivisionMultiplier);

        const timeout = setTimeout(() => {
            dispatch(startSound());
        }, noteDuration * 1000);
        dispatch(metronomeActions.updateCurBeat(timeout));
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