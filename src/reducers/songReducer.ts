import { getType } from 'typesafe-actions';
import shortid from 'shortid';

import { Song } from '../types/songTypes';
import { constants } from '../config/constants';
import { SongAction, songActions } from '../actions/songActions';
import { getGroupingsBeatSum } from '../lib/bar';
import { convertNoteValueToInt } from '../lib/noteValue';
import { BarData } from '../types/barTypes';

export interface SongState extends Song {}

const initialState: SongState = {
    ...constants.songs.DEFAULT_SONG
};

const SongReducer = (
    state: SongState = initialState,
    action: SongAction
): SongState => {
    switch (action.type) {
        case getType(songActions.updateBPM): {
            return {
                ...state,
                tempo: {
                    ...state.tempo,
                    bpm: action.payload.newBPM
                }
            };
        }
        case getType(songActions.updateNoteValue): {
            return {
                ...state,
                tempo: {
                    ...state.tempo,
                    noteValue: action.payload.newValue
                }
            };
        }
        case getType(songActions.addBar): {
            const newBars = state.bars.slice();
            const newBar: BarData = {
                ...constants.bars.DEFAULT_BAR_DATA,
                id: shortid.generate()
            };
            newBars.push(newBar);
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.removeBar): {
            const { idx } = action.payload;
            const newBars = state.bars.slice();
            newBars.splice(idx, 1);
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.copyBar): {
            const idx = action.payload.idx;
            const newBars = state.bars.slice();
            const newBar: BarData = {
                ...newBars[idx],
                id: shortid.generate()
            };
            // TODO: do I need to update groupingIds? i don't think so, since keys only need
            // to be unique among siblings. Could be problem if I use grouping ids for something else
            newBars.push(newBar);
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.updateBarNoteValue): {
            const { idx, newNoteValue } = action.payload;
            const newBars = state.bars.slice();
            const groupingBeatSum = getGroupingsBeatSum(newBars[idx].groupings);
            const newBarBeats = groupingBeatSum / convertNoteValueToInt(newNoteValue);
            newBars[idx] = {
                ...newBars[idx],
                beats: newBarBeats,
                noteValue: newNoteValue
            };
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.addGrouping): {
            const { barIdx } = action.payload;
            const newGrouping = {
                ...constants.bars.DEFAULT_GROUPING_DATA,
                id: shortid.generate()
            };
            const newBars = state.bars.slice();
            const targetBar = newBars[barIdx];
            const newGroupings = [...targetBar.groupings, newGrouping];
            const groupingBeatSum = getGroupingsBeatSum(newGroupings);
            const newBarBeats = groupingBeatSum / convertNoteValueToInt(targetBar.noteValue);
            newBars[barIdx] = {
                ...newBars[barIdx],
                beats: newBarBeats,
                groupings: newGroupings
            };

            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.removeGrouping): {
            const { barIdx, groupingIdx } = action.payload;
            const newBars = state.bars.slice();
            const targetBar = newBars[barIdx];
            const newGroupings = targetBar.groupings.slice();
            newGroupings.splice(groupingIdx, 1);
            const groupingBeatSum = getGroupingsBeatSum(newGroupings);
            const newBarBeats = groupingBeatSum / convertNoteValueToInt(targetBar.noteValue);
            newBars[barIdx] = {
                ...newBars[barIdx],
                beats: newBarBeats,
                groupings: newGroupings
            };
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.updateGroupingBeats): {
            const { barIdx, groupingIdx, newBeats } = action.payload;
            const newBars = state.bars.slice();
            const targetBar = newBars[barIdx];
            const newGroupings = targetBar.groupings.slice();
                newGroupings[groupingIdx] = {
                    ...newGroupings[groupingIdx],
                    beats: newBeats
            };
            const groupingBeatSum = getGroupingsBeatSum(newGroupings);
            const newBarBeats = groupingBeatSum / convertNoteValueToInt(targetBar.noteValue);
            newBars[barIdx] = {
                ...newBars[barIdx],
                beats: newBarBeats,
                groupings: newGroupings
            };
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.updateGroupingNoteValue): {
            const { barIdx, groupingIdx, newNoteValue } = action.payload;
            const newBars = state.bars.slice();
            const targetBar = newBars[barIdx];
            const newGroupings = targetBar.groupings.slice();
                newGroupings[groupingIdx] = {
                    ...newGroupings[groupingIdx],
                    noteValue: newNoteValue
            };
            const groupingBeatSum = getGroupingsBeatSum(newGroupings);
            const newBarBeats = groupingBeatSum / convertNoteValueToInt(targetBar.noteValue);
            newBars[barIdx] = {
                ...newBars[barIdx],
                beats: newBarBeats,
                groupings: newGroupings
            };
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.updateGroupingSubdivision): {
            // TODO: probably could have one reducer method for this, noteValue, and beats
            const { barIdx, groupingIdx, newValue } = action.payload;
            const newBars = state.bars.slice();
            const targetBar = newBars[barIdx];
            const newGroupings = targetBar.groupings.slice();
                newGroupings[groupingIdx] = {
                    ...newGroupings[groupingIdx],
                    subdivision: newValue
            };
            const groupingBeatSum = getGroupingsBeatSum(newGroupings);
            const newBarBeats = groupingBeatSum / convertNoteValueToInt
            (targetBar.noteValue);
            newBars[barIdx] = {
                ...newBars[barIdx],
                beats: newBarBeats,
                groupings: newGroupings
            };
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(songActions.songLoaded): {
            return {
                ...state,
                ...action.payload.song
            };
        }
        default: {
            return state;
        }
    }
};

export default SongReducer;