import { Tempo, BarData } from './barTypes';

export interface Song {
    name: string;
    bars: BarData[];
    tempo: Tempo;
}