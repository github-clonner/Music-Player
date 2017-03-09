package com.musicplayer.musicfiles;

import android.content.ContentResolver;
import android.database.Cursor;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.os.AsyncTask;
import android.provider.MediaStore;
import android.util.Pair;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MusicFiles extends ReactContextBaseJavaModule {

    public MusicFiles(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicFiles";
    }

    @ReactMethod
    public void getSongs(Callback callback) {
        GetSongsTask task = new GetSongsTask();
        task.callback = callback;
        task.execute();
    }

    
    private class GetSongsTask extends AsyncTask<Void, Void, Void> {
        public Callback callback;
        private String result;

        @Override
        protected Void doInBackground(Void... v) {
            ArrayList<JSONObject> songsList = new ArrayList<>();
            Pair<ArrayList<String>, ArrayList<JSONObject>> albumsList = getAlbums();

            ContentResolver musicResolver = getCurrentActivity().getContentResolver();
            Uri mediaUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
            Cursor mediaCursor = musicResolver.query(mediaUri, null, null, null, null);

            if(mediaCursor!= null && mediaCursor.moveToFirst()){
                int titleColumn = mediaCursor.getColumnIndex(MediaStore.Audio.Media.TITLE);
                int artistColumn = mediaCursor.getColumnIndex(MediaStore.Audio.Media.ARTIST);
                int albumIdColumn = mediaCursor.getColumnIndex(MediaStore.Audio.Media.ALBUM_ID);
                int pathColumn = mediaCursor.getColumnIndex(MediaStore.Audio.Media.DATA);
                int idColumn = mediaCursor.getColumnIndex(MediaStore.Audio.Media._ID);
                int durationColumn = mediaCursor.getColumnIndex(MediaStore.Audio.Media.DURATION);
                
                do {
                    long thisId = mediaCursor.getLong(idColumn);
                    String thisArtist = mediaCursor.getString(artistColumn);
                    String thisPath = mediaCursor.getString(pathColumn);
                    String thisTitle = mediaCursor.getString(titleColumn);
                    String thisAlbumId = mediaCursor.getString(albumIdColumn);
                    String thisDuration = mediaCursor.getString(durationColumn);

                    int albumIndex = albumsList.first.indexOf(thisAlbumId);

                    if (albumIndex != -1){
                        if (thisArtist.contains("<unknown>")) thisArtist = "Unknown Artist";
                        
                        JSONObject song = new JSONObject();
                        try {
                            song.put("id", thisId);
                            song.put("artist", thisArtist);
                            song.put("duration", Integer.parseInt(thisDuration));
                            song.put("path", thisPath);
                            song.put("title", thisTitle);
                        }
                        catch (JSONException e) {}
                        catch (NumberFormatException e) {}

                        
                        JSONObject album = albumsList.second.get(albumIndex);
                        try {
                            album.put("artist", thisArtist);
                            song.put("album", album);
                        } catch (JSONException e) {}

                        songsList.add(song);
                    }
                }
                while (mediaCursor.moveToNext());
            }
            mediaCursor.close();

            result = new JSONArray(songsList).toString();
            return null;
        }
        
        @Override
        protected void onPostExecute(Void v) {
            callback.invoke(result);
        }

        private Pair<ArrayList<String>, ArrayList<JSONObject>> getAlbums(){
            ArrayList<String> albumsIds = new ArrayList<>();
            ArrayList<JSONObject> albumsJsons = new ArrayList<>();

            Uri albumUri = MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI;
            ContentResolver musicResolver = getCurrentActivity().getContentResolver();
            Cursor albumCursor = musicResolver.query(albumUri, null, null, null, null);

            if(albumCursor != null && albumCursor.moveToFirst()) {
                int idColumn = albumCursor.getColumnIndex(MediaStore.Audio.Albums._ID);
                int albumColumn = albumCursor.getColumnIndex(MediaStore.Audio.Albums.ALBUM);
                int numberOfSongs = albumCursor.getColumnIndex(MediaStore.Audio.Albums.NUMBER_OF_SONGS);
                int albumArtColumn = albumCursor.getColumnIndex(MediaStore.Audio.Albums.ALBUM_ART);

                do {
                    String thisId = albumCursor.getString(idColumn);
                    String thisAlbum = albumCursor.getString(albumColumn);
                    String thisPath = albumCursor.getString(albumArtColumn);
                    String thisNumberOfSongs = albumCursor.getString(numberOfSongs);

                    JSONObject album = new JSONObject();
                    try {
                        album.put("id", Integer.parseInt(thisId));
                        album.put("cover", (thisPath == null ? "" : "file://" + thisPath));
                        album.put("numberOfSongs", Integer.parseInt(thisNumberOfSongs));
                        album.put("title", thisAlbum);
                    }
                    catch (JSONException e) {}
                    catch (NumberFormatException e) {}

                    albumsIds.add(thisId);
                    albumsJsons.add(album);
                }
                while (albumCursor.moveToNext());
            }
            albumCursor.close();
            
            return new Pair<>(albumsIds, albumsJsons);
        }
    }
}

