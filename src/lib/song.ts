import { Song } from '../types/songTypes';
import { constants } from '../config/constants';

// TODO: in the future, this should use some kind of HTTPRequest
// to fetch songs from an endpoint
export const getSongById = (songId: string): Song => {
    const songList = constants.songs.SONG_LIST;
    const song = songList.find(candidate => {
        return candidate.name === songId;
    });
    if (!song) {
        // TODO
        throw Error('song not found');
    }
    return song;
};