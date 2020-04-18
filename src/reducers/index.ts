import { MetronomeState } from './metronomeReducer';
import { SongState } from './songReducer';

export interface RootState {
    metronome: MetronomeState;
    song: SongState;
}