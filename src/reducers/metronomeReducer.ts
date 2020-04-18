import { metronomeActions, MetronomeAction } from '../actions/metronomeActions';
import { getType } from 'typesafe-actions';

// TODO: break bar stuff into a separate reducer? curBeat depends on bar info, so maybe not
export interface MetronomeState {
    playing: boolean;
    curBeat: number;
    curBarIdx: number;
    curGroupingIdx: number;
    curTimeout?: NodeJS.Timeout;
    startingBarIdx: number;
    endingBarIdx: number;
}

const initialState: MetronomeState = {
    playing: false,
    curBeat: 0,
    curBarIdx: 0,
    curGroupingIdx: 0,
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
            if (newIdx < state.startingBarIdx) {
                return state;
            }
            return {
                ...state,
                endingBarIdx: action.payload.newIdx
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