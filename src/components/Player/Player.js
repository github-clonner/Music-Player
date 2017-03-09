import React, { Component } from 'react';
import {
  Image,
  LayoutAnimation,
  Slider,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import * as PlayerActions from '../../actions/PlayerActions';

import { BackIconNav, Touchable } from '../common';
import { playerTrack as defaultCover } from '../../assets/images';
import formatTime from '../../utils/formatTime';
import { COLORS } from '../../styles/colors';


class Player extends Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  state = {
    currentTimeToShow: this.props.currentTime,
    change: this.props.change, 
    currentSong: this.props.currentSong, 
    currentTime: this.props.currentTime, 
    paused: this.props.paused, 
    repeat: this.props.repeat, 
    shuffle: this.props.shuffle, 
    sliding: this.props.sliding,
    duration: this.props.currentSong.duration / 1000,
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.sliding) return;
    
    this.setState({ 
      ...nextProps,
      currentTimeToShow: nextProps.currentTime,
      duration: nextProps.currentSong.duration / 1000
    });
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  playPausePress = () => {
    this.props.playPause();
  }

  sliderChange = (currentTime) => {
    this.setState({ 
      currentTimeToShow: currentTime,
      sliding: true
    }, this.props.stopPlaying);
  }

  slidingComplete = (val) => {
    this.setState({ sliding: false }, () => 
      this.props.seekPlayer(val));
  }

  shufflePressed = () => {
    this.props.toggleShuffle();
  }

  repeatPressed = () => {
    this.props.toggleRepeat();
  }

  render() {
    const { title, artist, album } = this.state.currentSong;
    const albumCover = album.cover;
    const cover = albumCover.length < 1 ? defaultCover : { uri: albumCover };

    return (
      <View style={styles.bgCoverContainer}>
        <StatusBar animated translucent backgroundColor='#0005' />
        <Image
          source={cover}
          style={styles.bgCover}
        >
          <View style={styles.container} animation='fadeInDown'>
            <Animatable.View style={styles.header}>
              <Text style={styles.songName}>
                {title}
              </Text>
              <Text style={styles.songInfo}>
                {artist}
              </Text>
            </Animatable.View>

            <Animatable.View style={styles.coverContainer} animation='zoomIn'>
              <Image
                source={cover}
                style={styles.cover}
              />
            </Animatable.View>

            <View>
              <View style={styles.timer}>
                <Text style={styles.time}>
                  {formatTime(this.state.currentTimeToShow)}
                </Text>
                <Text style={styles.time}>
                  {formatTime(this.state.duration)}
                </Text>
              </View>
              <Slider
                maximumValue={this.state.duration}
                minimumValue={0}
                onSlidingComplete={this.slidingComplete}
                onValueChange={(val) => this.sliderChange(val)}
                step={0.1}
                thumbTintColor={COLORS.accent}
                maximumTrackTintColor={COLORS.accent}
                minimumTrackTintColor={COLORS.accent}
                value={this.state.currentTime}
              />

              <View style={styles.media}>
                
                <Icon
                  name='shuffle'
                  onPress={this.shufflePressed}
                  size={21}
                  style={{ padding: 10 }}
                  color={this.state.shuffle 
                    ? COLORS.accent : COLORS.textIcons}
                />
                <Touchable onPress={this.props.prevSong}>
                  <Icon
                    name='skip-previous'
                    size={55}
                    color={COLORS.textIcons}
                  />
                </Touchable>
                <Touchable onPress={this.playPausePress}>
                  <Icon
                    name={this.state.paused ? 'play-arrow' : 'pause'}
                    size={80}
                    color={COLORS.textIcons}
                  />
                </Touchable>
                <Touchable onPress={this.props.nextSong}>
                  <Icon
                    name='skip-next'
                    size={55}
                    color={COLORS.textIcons}
                  />
                </Touchable>
                <Icon
                  name='replay'
                  onPress={this.repeatPressed}
                  size={21}
                  style={{ padding: 10 }}
                  color={this.state.repeat 
                    ? COLORS.accent : COLORS.textIcons}
                />
              </View>
            </View>

            <View style={styles.nav}>
              <BackIconNav />
            </View>

          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000C',
    flex: 1,
  },
  cover: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  coverContainer: {
    flex: 1,
    margin: 15,
  },
  bgCover: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  },
  bgCoverContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 55 + StatusBar.currentHeight,
  },
  media: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  nav: { 
    position: 'absolute', 
    marginTop: StatusBar.currentHeight 
  },
  songInfo: {
    color: 'white'
  },
  songName: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    paddingHorizontal: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  time: {
    color: 'white',
    fontSize: 11,
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 15
  }
});


const mapStateToProps = ({ player }) => {
  const { change, currentSong, currentTime, paused, repeat, shuffle } = player;

  return { change, currentSong, currentTime, paused, repeat, shuffle };
};

export default connect(mapStateToProps, {
  ...PlayerActions
})(Player);