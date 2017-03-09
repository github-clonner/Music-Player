import { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-native-sound';
import MusicControl from '../../nativeModules/music-control';
import { 
  nextSong, 
  prevSong,
  songTimeChange, 
  stopPlaying,
  startPlaying,
} from '../../actions';


class MainPlayer extends Component {
  audio = new Sound('');
  paused = true;
  interval = setInterval(() => this.timer(), 1000);

  componentWillMount() {
    this.props.stopPlaying();
  }

  componentDidMount() {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);

    MusicControl.on('play', () => {
      this.props.startPlaying();
      MusicControl.setPlayback({ state: MusicControl.STATE_PLAYING });
    });

    MusicControl.on('pause', () => {
      this.props.stopPlaying();
      MusicControl.setPlayback({ state: MusicControl.STATE_PAUSED });
    });

    MusicControl.on('nextTrack', () => {
      this.props.nextSong();
    });

    MusicControl.on('previousTrack', () => {
      this.props.prevSong(true);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { change, currentSong, currentTime, paused, seek } = nextProps;

    if (paused && !this.paused) {
      this.paused = true;
      this.audio.pause();
      MusicControl.setPlayback({ state: MusicControl.STATE_PAUSED });
    } else if (!paused && this.paused) {
      this.paused = false;
      this.audio.play(this.onEnd);
      MusicControl.setPlayback({ state: MusicControl.STATE_PLAYING });
      if (!this.audio.isLoaded()) {
        this.startSong(currentSong, currentTime);
      }
    }

    if (change) {
      if (seek) {
        this.audio.setCurrentTime(currentTime);
        this.props.startPlaying();
        return;
      } 

      this.startSong(currentSong, currentTime);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    
    this.audio.stop();
    this.audio.release();

    MusicControl.resetNowPlaying();
  }

  changeTime = (song) => {
    this.props.songTimeChange(song.currentTime);
  }

  notification = (song) => {
    MusicControl.setNowPlaying({
      title: song.title,
      artwork: song.album.cover.substring(6),
      artist: song.artist,
      album: song.album.title,
    });
    MusicControl.setPlayback({ state: MusicControl.STATE_PLAYING });
  }

  onEnd = () => {
    this.audio.release();
    this.props.nextSong();
  }

  startSong = (song, time) => {
    this.audio.stop();
    this.audio.release();

    this.audio = new Sound(song.path, '', (err) => {
      if (!err) {
        this.audio.setSpeed(1);
        this.audio.setCurrentTime(time);
        this.audio.play(this.onEnd);
        this.props.startPlaying();
        this.notification(song);
      }
    });
  }

  timer = () => {
    this.audio.getCurrentTime((secs, isPlaying) => {
      if (isPlaying) this.props.songTimeChange(secs);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = ({ player }) => {
  const { change, currentSong, currentTime, seek, paused } = player;

  return { change, currentSong, currentTime, seek, paused };
};

export default connect(mapStateToProps, { 
  nextSong, prevSong, songTimeChange, stopPlaying, startPlaying 
})(MainPlayer);
