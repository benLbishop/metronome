import { Tempo, BarData } from './barTypes';

// TODO: when loading song, find maxBarId?
// should be fixed when I move to some id library
export interface Song {
    name: string;
    bars: BarData[];
    tempo: Tempo;
}