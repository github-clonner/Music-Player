import MusicFiles from '../nativeModules/music-files';
import {
  ADD_TO_QUEUE,
  ADD_AS_NEXT,
  NEXT_SONG,
  PREVIOUS_SONG,
  TOGGLE_REPEAT,
  TOGGLE_SHUFFLE,
  PLAY_PAUSE,
  PLAY_SONG,
  SONG_CURRENT_TIME,
  START_PLAYING,
  STOP_PLAYING,
  MUSIC_LOADED,
  SEEK_PLAYER,
  PLAY_ALBUM,
  PLAY_ALL_TRACKS,
  PLAY_ARTIST,
} from './types';


export const addToQueue = (song) => {
  return {
    type: ADD_TO_QUEUE,
    payload: song
  };
};

export const addAsNext = (song) => {
  return {
    type: ADD_AS_NEXT,
    payload: song
  };
};

export const nextSong = (auto = true) => {
  return {
    type: NEXT_SONG,
    payload: auto
  };
};

export const prevSong = (force = false) => {
  return {
    type: PREVIOUS_SONG,
    payload: force
  };
};

export const toggleRepeat = () => {
  return {
    type: TOGGLE_REPEAT
  };
};

export const toggleShuffle = () => {
  return {
    type: TOGGLE_SHUFFLE
  };
};

export const playPause = () => {
  return {
    type: PLAY_PAUSE
  };
};

export const startPlaying = () => {
  return {
    type: START_PLAYING
  };
};

export const stopPlaying = () => {
  return {
    type: STOP_PLAYING
  };
};

export const playSong = (song) => {
  return {
    type: PLAY_SONG,
    payload: song
  };
};

export const songTimeChange = (time) => {
  return {
    type: SONG_CURRENT_TIME,
    payload: time
  };
};

export const seekPlayer = (time) => {
  return {
    type: SEEK_PLAYER,
    payload: time
  };
};

export const playAlbum = (albumId, shuffle = false) => {
  return {
    type: PLAY_ALBUM,
    payload: { albumId, shuffle }
  };
};

export const playAllTracks = (shuffle = false) => {
  return {
    type: PLAY_ALL_TRACKS,
    payload: shuffle
  };
};

export const playArtist = (artist, shuffle = false) => {
  return {
    type: PLAY_ARTIST,
    payload: { artist, shuffle }
  };
};

export const loadMusic = (music) => {
  return {
    type: MUSIC_LOADED,
    payload: music
  };
};

export const loadMusicAsync = () => {
  return (dispatch) => {
    MusicFiles.getMusic((music) => {
      dispatch({
        type: MUSIC_LOADED,
        payload: music
      });
    });
  };
};