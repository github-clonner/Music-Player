import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { navStart, loadMusic, loadMusicAsync } from '../../actions';
import { logo } from '../../assets/images';
import MusicFiles from '../../nativeModules/music-files';


class StartScreen extends Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.songs.length > 0) {
        this.props.loadMusicAsync();
        this.start();
      } else this.getMusic();
    }, 1300);
  }

  getMusic = () => {
    MusicFiles.getMusic((music) => {
      this.props.loadMusic(music);
      this.start();
    });
  }

  start = () => {
    this.refs.loader.zoomOut(300)
      .then(() => this.props.navStart());
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Animatable.Image
          animation='zoomIn'
          style={styles.logo}
          source={logo}
        />

        <Animatable.View 
          ref='loader' 
          animation='zoomIn'
          style={styles.loader}
        >
          <ActivityIndicator size='large' color='black' />  
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    margin: 35
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  logo: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: 205,
    height: 192
  }
});

export default connect(
  ({ player }) => ({ songs: player.songs }), 
  { navStart, loadMusic, loadMusicAsync })(StartScreen);