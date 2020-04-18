import { metronomeActions, MetronomeAction } from '../actions/metronomeActions';
import { getType } from 'typesafe-actions';
import { BarData, GroupingData, NoteValue, Tempo } from '../types/barTypes';
import { checkIfBarFull } from '../lib/bar';
import { makeElectricSunrise, makeJolt } from '../config/songs';

// TODO: move to constants
const DEFAULT_GROUPING_DATA: GroupingData = {
    beats: 4,
    noteValue: NoteValue.QUARTER
};

const DEFAULT_BAR_DATA: BarData = {
    id: 0,
    beats: 4,
    noteValue: NoteValue.QUARTER,
    groupings: [DEFAULT_GROUPING_DATA]
};

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
    bars: makeElectricSunrise()
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
            // 1. take curBeat and find current measure
            const { curBeat, curBarIdx, bars, curGroupingIdx } = state;
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
                newGroupingIdx = curGroupingIdx + 1;
                if (newGroupingIdx >= curBar.groupings.length) {
                    newGroupingIdx = 0;
                    newBarIdx = (curBarIdx + 1) % bars.length;
                }
            }
            return {
                ...state,
                curBarIdx: newBarIdx,
                curBeat: newBeat,
                curGroupingIdx: newGroupingIdx,
                curTimeout: action.payload.timeout
            };
        }
        case getType(metronomeActions.addBar): {
            const newBars = state.bars.slice();
            const newBar: BarData = {
                ...DEFAULT_BAR_DATA,
                id: state.newBarId
            };
            newBars.push(newBar);
            return {
                ...state,
                bars: newBars,
                newBarId: state.newBarId + 1
            };
        }
        case getType(metronomeActions.removeBar): {
            const { idx } = action.payload;
            const newBars = state.bars.slice();
            newBars.splice(idx, 1);
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(metronomeActions.copyBar): {
            // TODO
            console.log('copyBar not implemented');
            return state;
        }
        case getType(metronomeActions.updateBarBeats): {
            const { idx, newBeats } = action.payload;
            const newBars = state.bars.slice();
            newBars[idx] = {
                ...newBars[idx],
                beats: newBeats
            };
            return {
                ...state,
                bars: newBars
            };
        }
        case getType(metronomeActions.updateBarNoteValue): {
            const { idx, newNoteValue } = action.payload;
            const newBars = state.bars.slice();
            newBars[idx] = {
                ...newBars[idx],
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
            newBars[barIdx] = {
                ...newBars[barIdx],
                groupings: [...newBars[barIdx].groupings, DEFAULT_GROUPING_DATA]
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
            newBars[barIdx] = {
                ...newBars[barIdx],
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
            newBars[barIdx] = {
                ...newBars[barIdx],
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
                curBarIdx: 0
            };
        }
        default: {
            return state;
        }
    }
};

export default MetronomeReducer;