import { metronomeActions, MetronomeAction } from '../actions/metronomeActions';
import { getType } from 'typesafe-actions';
import { BarData, GroupingData, NoteValue, Tempo } from '../types/barTypes';
import { checkIfBarFull, getGroupingsBeatSum } from '../lib/bar';
import { convertNoteValueToInt } from '../lib/noteValue';
import { constants } from '../config/constants';

// TODO: break bar stuff into a separate reducer? curBeat depends on bar info, so maybe not
export interface MetronomeState {
    playing: boolean;
    tempo: Tempo;
    curBeat: number;
    curBarIdx: number;
    curGroupingIdx: number;
    newBarId: number; // TODO: use some kind of id library
    bars: BarData[];
    curTimeout?: NodeJS.Timeout;
    startingBarIdx: number;
    endingBarIdx: number;
}

const initialState: MetronomeState = {
    playing: false,
    tempo: {
        bpm: 120,
        noteValue: NoteValue.QUARTER
    },
    curBeat: 0,
    curBarIdx: 0,
    curGroupingIdx: 0,
    newBarId: 1,
    bars: constants.bars.DEFAULT_BARS,
    startingBarIdx: 0,
    endingBarIdx: 0
};

const MetronomeReducer = (
    state: MetronomeState = initialState,
    action: MetronomeAction
): MetronomeState => {
    switch (action.type) {
        case getType(metronomeActions.togglePlay): {
            return {
                ...state,
                playing: !state.playing
            };
        }
        case getType(metronomeActions.updateBPM): {
            return {
                ...state,
                tempo: {
                    ...state.tempo,
                    bpm: action.payload.newBPM
                }
            };
        }
        case getType(metronomeActions.updateNoteValue): {
            return {
                ...state,
                tempo: {
                    ...state.tempo,
                    noteValue: action.payload.newValue
                }
            };
        }
        case getType(metronomeActions.updateCurBeat): {
            const { newBeat, newBarIdx, newGroupingIdx, timeout } = action.payload;
            return {
                ...state,
                curBeat: newBeat,
                curBarIdx: newBarIdx,
                curGroupingIdx: newGroupingIdx,
                curTimeout: timeout
            };
        }
        case getType(metronomeActions.updateStartingBarIdx): {
            const newIdx = action.payload.newIdx;
            if (newIdx < 0 || newIdx > state.endingBarIdx) {
                return state;
            }
            return {
                ...state,
                startingBarIdx: action.payload.newIdx
            };
        }
        case getType(metronomeActions.updateEndingBarIdx): {
            const newIdx = action.payload.newIdx;
            if (newIdx > state.bars.length || newIdx < state.startingBarIdx) {
                return state;
            }
            return {
                ...state,
                endingBarIdx: action.payload.newIdx
            };
        }
        case getType(metronomeActions.addBar): {
            const newBars = state.bars.slice();
            const newBar: BarData = {
                ...constants.bars.DEFAULT_BAR_DATA,
                id: state.newBarId
            };
            newBars.push(newBar);
            let endingBarIdx = state.endingBarIdx;
            if (state.endingBarIdx === state.bars.length - 1) {
                endingBarIdx += 1;
            }
            return {
                ...state,
                endingBarIdx,
                bars: newBars,
                newBarId: state.newBarId + 1
            };
        }
        case getType(metronomeActions.removeBar): {
            const { idx } = action.payload;
            const newBars = state.bars.slice();
            newBars.splice(idx, 1);
            let endingBarIdx = state.endingBarIdx;
            if (state.endingBarIdx === state.bars.length - 1) {
                endingBarIdx -= 1;
            }
            return {
                ...state,
                endingBarIdx,
                bars: newBars
            };
        }
        case getType(metronomeActions.copyBar): {
            // TODO
            console.log('copyBar not implemented');
            return state;
        }
        case getType(metronomeActions.updateBarNoteValue): {
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
        case getType(metronomeActions.addGrouping): {
            const { barIdx } = action.payload;
            const newBars = state.bars.slice();
            const targetBar = newBars[barIdx];
            const newGroupings = [...targetBar.groupings, constants.bars.DEFAULT_GROUPING_DATA];
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
        case getType(metronomeActions.removeGrouping): {
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
        case getType(metronomeActions.updateGroupingBeats): {
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
        case getType(metronomeActions.updateGroupingNoteValue): {
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
        case getType(metronomeActions.updateGroupingSubdivision): {
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
        case getType(metronomeActions.cancelCurTimeout): {
            const { curTimeout } = state;
            if (!curTimeout) {
                return state;
            }
            clearTimeout(curTimeout);
            return {
                ...state,
                curTimeout: undefined,
                curBeat: 0,
                curBarIdx: state.startingBarIdx
            };
        }
        default: {
            return state;
        }
    }
};

export default MetronomeReducer;