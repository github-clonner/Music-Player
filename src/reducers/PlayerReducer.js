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
  PLAY_ARTIST
} from '../actions/types';


const INITIAL_STATE = {
  albums: [],
  artists: [],
  change: false,
  currentSong: null,
  currentTime: 0,
  index: 0,
  paused: false,
  playlist: [],
  repeat: false,
  shuffle: false,
  songs: [],
  queue: []
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_QUEUE:
      return { 
        ...state, 
        queue: [...state.queue, state.songs.indexOf(payload)] 
      };

    case ADD_AS_NEXT:
      return { 
        ...state, 
        queue: [state.songs.indexOf(payload), ...state.queue] 
      };

    case MUSIC_LOADED:
      return { ...state, ...payload, playlist: payload.songs };

    case NEXT_SONG: {
      if (state.repeat && !payload) {
        return { 
          ...state, 
          change: true, 
          currentTime: 0 
        };
      }
      if (state.queue.length > 0) {
        const queue = [...state.queue];
        const index = queue.shift();

        return { 
          ...state, 
          change: true, 
          currentTime: 0, 
          currentSong: state.songs[index],
          queue 
        };
      }

      const len = state.playlist.length;
      const next = (state.index + 1 >= len ? len - 1 : state.index + 1);
      
      const nextIndex = 
        state.shuffle 
        ? Math.floor(Math.random() * len)
        : next;

      return { 
        ...state, 
        change: true,
        currentTime: 0, 
        currentSong: state.playlist[nextIndex], 
        index: nextIndex 
      };
    }

    case PREVIOUS_SONG: {
      if (!payload && state.currentTime > 1) {
        return { ...state, change: true, currentTime: 0 };
      }
      
      if (state.playlist.length < 1) return state;
      
      let nextIndex = state.index - 1;
      nextIndex = nextIndex < 0 ? 0 : nextIndex;

      return { 
        ...state, 
        change: true, 
        currentTime: 0, 
        currentSong: state.playlist[nextIndex], 
        index: nextIndex
      };
    }

    case TOGGLE_REPEAT:
      return { ...state, change: false, repeat: !state.repeat };

    case TOGGLE_SHUFFLE:
      return { ...state, change: false, shuffle: !state.shuffle };

    case PLAY_PAUSE:
      return { ...state, change: false, paused: !state.paused, seek: false };

    case PLAY_SONG: 
      return { 
        ...state, 
        change: true, 
        currentSong: payload,
        currentTime: 0,
        index: state.songs.indexOf(payload),
        playlist: state.songs,
        paused: false,
        seek: false
      };

    case SEEK_PLAYER:
      return { 
        ...state, 
        change: true, 
        currentTime: payload, 
        seek: true, 
        paused: true 
      };

    case START_PLAYING:
      return { ...state, change: false, paused: false, seek: false };

    case STOP_PLAYING:
      return { ...state, change: false, paused: true };

    case SONG_CURRENT_TIME:
      return { ...state, change: false, currentTime: payload };

    case PLAY_ALBUM: {
      const { albumId, shuffle } = payload;
      const playlist = [];

      state.songs.forEach(song => {
        if (song.album.id === albumId) playlist.push(song);
      });

      return { 
        ...state, 
        queue: [], 
        change: true,
        currentTime: 0,
        currentSong: playlist[0],
        index: 0,
        paused: false,
        seek: false,
        playlist,
        shuffle
      };
    }

    case PLAY_ARTIST: {
      const { artist, shuffle } = payload;
      const playlist = [];

      state.songs.forEach(song => {
        if (artist.albumsIds.indexOf(song.album.id) !== -1) playlist.push(song);
      });
      
      return { 
        ...state, 
        queue: [], 
        change: true,
        currentTime: 0,
        currentSong: playlist[0],
        index: 0,
        paused: false,
        seek: false,
        playlist,
        shuffle
      };
    }

    case PLAY_ALL_TRACKS: {    
      if (state.songs.length < 1) return state;

      return { 
        ...state,
        shuffle: payload,
        change: true,
        currentSong: state.songs[0],
        index: 0,
        currentTime: 0,
        paused: false,
        seek: false,
        playlist: state.songs,
        queue: []
      };
    }

    default:
      return state;
  }
};