import { NativeModules } from 'react-native';

const { MusicFiles } = NativeModules;

const extractAlbums = (songs) => {
  let albums = songs.map(s => s.album);
  const albumsIds = albums.map(a => a.id);

  albums = albums
    .filter((a, i) => albumsIds.indexOf(a.id) === i)
    .sort((a, b) => a.title.localeCompare(b.title));
  return albums;
};

const extractArtists = (songs) => {
  let artists = songs.map(s => s.artist);
  artists = artists
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .sort((a, b) => a.localeCompare(b))
    .map(a => {
      let tracksCount = 0;
      const albumsIds = [];

      songs.forEach(s => {
        if (s.artist === a) {
          ++tracksCount;
          if (albumsIds.indexOf(s.album.id) < 0) albumsIds.push(s.album.id);
        }
      });
      return { name: a, tracks: tracksCount, albumsIds };
    });

  return artists;
};

export default {
  async getMusic(callback) {
    MusicFiles.getSongs((songsJson) => {
      const songs = JSON.parse(songsJson).sort((a, b) => 
        a.title.localeCompare(b.title));
      
      const albums = extractAlbums(songs);
      const artists = extractArtists(songs);

      callback({ albums, artists, songs });
    });
  }
};
