import { metronomeActions, MetronomeAction } from '../actions/metronomeActions';
import { getType } from 'typesafe-actions';
import { SongAction, songActions } from '../actions/songActions';

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

// TODO: try new typesafe-actions createReducer?
const MetronomeReducer = (
    state: MetronomeState = initialState,
    action: MetronomeAction | SongAction
): MetronomeState => {
    switch (action.type) {
        case getType(metronomeActions.metronomeStarted): {
            // don't expect this to happen, but clear any existing timeouts in case metronome
            // tries to start and is already playing
            const { curTimeout } = state;
            if (curTimeout) {
                clearTimeout(curTimeout);
            }
            return {
                ...state,
                playing: true
            };
        }
        case getType(metronomeActions.metronomeStopped): {
            const { curTimeout } = state;
            if (curTimeout) {
                clearTimeout(curTimeout);
            }
            return {
                ...state,
                playing: false,
                curBeat: 0,
                curBarIdx: state.startingBarIdx,
                curTimeout: undefined
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
        /** SONG ACTIONS **/
        case getType(songActions.songLoaded): {
            const lastBarIdx = action.payload.song.bars.length - 1;
            return {
                ...state,
                startingBarIdx: 0,
                endingBarIdx: lastBarIdx
            };
        }
        default: {
            return state;
        }
    }
};

export default MetronomeReducer;