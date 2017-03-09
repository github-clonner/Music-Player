import React, { Component } from 'react';
import { LayoutAnimation, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
  nextSong, 
  playPause, 
  songTimeChange, 
  stopPlaying,
  startPlaying,
  navPlayer
} from '../../actions';
import { Touchable } from '../common';
import { playerTrack as defaultCover } from '../../assets/images';
import { COLORS } from '../../styles/colors';


class MiniPlayer extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  
  playPausePress = () => {
    this.props.playPause();
  }

  render() {
    if (this.props.currentSong === null) return null;

    const { currentSong, currentTime } = this.props;
    const { album, artist, duration, title } = currentSong;
    const timeLeft = (duration / 1000) - currentTime;

    return (
      <View style={[styles.container]}>

        <View style={styles.view}>
          <Touchable 
            style={styles.view}
            onPress={() => this.props.navPlayer()}
          >
            <Image 
              source={album.cover.length < 1 ? defaultCover : { uri: album.cover }}
              style={styles.img}
            />
            <View style={styles.textContainer}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {title}
              </Text>
              <Text
                style={styles.subtitle}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {artist}
              </Text>
            </View>
          </Touchable>

          <Touchable onPress={this.props.playPause} style={styles.playPause}>
            <Icon
              name={this.props.paused ? 'play-arrow' : 'pause'}
              size={35}
              color='black'
            />
          </Touchable>
        </View>
        
        <View style={styles.bar}>
          <View style={[styles.progress, { flex: currentTime }]} />
          <View style={{ flex: timeLeft }} />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    zIndex: 1,
    height: 3,
    top: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
  },
  container: {
    backgroundColor: COLORS.lightGray,
    height: 50,
    elevation: 4,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'cover'
  },
  playPause: {
    padding: 10
  },
  progress: {
    backgroundColor: COLORS.accent,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.secondaryText
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginRight: 15
  },
  title: {
    color: COLORS.primaryText,
    fontSize: 14,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  }
});

const mapStateToProps = ({ player }) => {
  const { change, currentSong, currentTime, seek, paused } = player;

  return { change, currentSong, currentTime, seek, paused };
};

const MiniPlayerComp = connect(mapStateToProps, { 
  nextSong, playPause, songTimeChange, stopPlaying, startPlaying, navPlayer 
})(MiniPlayer);

export { MiniPlayerComp as MiniPlayer };
