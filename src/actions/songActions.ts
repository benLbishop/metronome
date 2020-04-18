import { createAction, ActionType } from 'typesafe-actions';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { NoteValue } from '../types/barTypes';
import { RootState } from '../reducers';
import { metronomeActions, stopMetronome } from './metronomeActions';
import { constants } from '../config/constants';
import { Song } from '../types/songTypes';
import { getSongById } from '../lib/song';

const UPDATE_BPM = 'UPDATE_BPM';
const UPDATE_NOTE_VALUE = 'UPDATE_NOTE_VALUE';
const ADD_BAR = 'ADD_BAR';
const REMOVE_BAR = 'REMOVE_BAR';
const COPY_BAR = 'COPY_BAR';
const UPDATE_BAR_NOTE_VALUE = 'UPDATE_BAR_NOTE_VALUE';
const ADD_GROUPING = 'ADD_GROUPING';
const REMOVE_GROUPING = 'REMOVE_GROUPING';
const UPDATE_GROUPING_BEATS = 'UPDATE_GROUPING_BEATS';
const UPDATE_GROUPING_NOTE_VALUE = 'UPDATE_GROUPING_NOTE_VALUE';
const UPDATE_GROUPING_SUBDIVISION = 'UPDATE_GROUPING_SUBDIVISION';
const SONG_LOADED = 'SONG_LOADED';

export const songActions = {
    updateBPM: createAction(
        UPDATE_BPM,
        (newBPM: number) => ({ newBPM })
    )(),
    updateNoteValue: createAction(
        UPDATE_NOTE_VALUE,
        (newValue: NoteValue) => ({ newValue })
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
    songLoaded: createAction(
        SONG_LOADED,
        (song: Song) => ({ song })
    )()
};

export const handleAddBar = () => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const numBars = getState().song.bars.length;
        if (numBars === constants.bars.MAX_NUM_BARS) {
            // TODO: pop up some alert
            return;
        }
        dispatch(songActions.addBar());
        const oldMaxBarIdx = numBars - 1;
        const endingBarIdx = getState().metronome.endingBarIdx;
        if (endingBarIdx === oldMaxBarIdx) {
            dispatch(metronomeActions.updateEndingBarIdx(oldMaxBarIdx + 1));
        }
    };
};

// TODO this, handleAddBar, and handleRemoveBar are all similar and can probably be 1 fn
export const handleCopyBar = (idx: number) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const numBars = getState().song.bars.length;
        if (numBars === constants.bars.MAX_NUM_BARS) {
            // TODO: pop up some alert
            return;
        }
        dispatch(songActions.copyBar(idx));
        const oldMaxBarIdx = numBars - 1;
        const endingBarIdx = getState().metronome.endingBarIdx;
        if (endingBarIdx === oldMaxBarIdx) {
            dispatch(metronomeActions.updateEndingBarIdx(oldMaxBarIdx + 1));
        }
    };
};

export const handleRemoveBar = (idx: number) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
        const numBars = getState().song.bars.length;
        if (numBars === 1) {
            // TODO: pop up some alert
            return;
        }
        dispatch(songActions.removeBar(idx));
        const oldMaxBarIdx = numBars - 1;
        const endingBarIdx = getState().metronome.endingBarIdx;
        if (endingBarIdx === oldMaxBarIdx) {
            dispatch(metronomeActions.updateEndingBarIdx(oldMaxBarIdx - 1));
        }
    };
};

export const loadSong = (songId: string) => {
    return (dispatch: ThunkDispatch<RootState, void, Action>) => {
        dispatch(stopMetronome());
        try {
            const song = getSongById(songId);
            dispatch(songActions.songLoaded(song));
        } catch (err) {
            // TODO
            console.log('err in loadSong: ', err);
        }
    };
};

export type SongAction = ActionType<typeof songActions>;