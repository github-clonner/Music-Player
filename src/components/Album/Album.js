import React, { Component } from 'react';
import { 
  Image, 
  ListView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { connect } from 'react-redux';
import { playAlbum } from '../../actions';
import { Fab, BackIconNav, MiniPlayer, MoreIcon } from '../common';
import { albumSolo as albumImg } from '../../assets/images';
import TrackItem from '../Tabs/TrackItem';
import popup from '../../utils/popup';
import { COLORS } from '../../styles/colors';


class Albums extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }
  
  componentWillMount() {
    const { album } = this.props.navigation.state.params;
    const { songs } = this.props;

    const tracksInAlbum = songs
      .filter(song => song.album.id === album.id)
      .map(track => <TrackItem track={track} noimage />);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.album = album;
    this.ds = ds.cloneWithRows(tracksInAlbum);
  }

  more = [
    { key: 'play', label: 'Play All' },
    { key: 'shuffle', label: 'Shuffle All' },
  ]

  moreClick = (index) => {
    const { id } = this.album;
    
    switch (index) {
      case 0:
        this.props.playAlbum(id);
        break;
      
      case 1:
        this.props.playAlbum(id, true);
        break;

      default:
        return;
    }
  }

  morePress = (context) => {
    popup(
      context, 
      this.more.map(o => o.label), 
      this.moreClick);
  }
  
  render() {
    const { cover } = this.album;
    const image = cover.length > 0 ? { uri: cover } : albumImg;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent animated backgroundColor='#0005' />
        <View style={styles.topContainer}>
          <Image 
            source={image}
            style={styles.imgTop}
          >
            <View style={styles.imgTopOverlay}>
              <View style={styles.navRow}>
                <BackIconNav color={COLORS.textIcons} />
                <MoreIcon onPress={this.morePress} style={styles.more} />
              </View>
              <View style={styles.headerRow}>
                <View style={styles.imgCoverContainer}>
                  <Image
                    source={image}
                    style={styles.imgCover}
                  />
                </View>

                <View style={styles.header}>
                  <Text 
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {this.album.title}
                  </Text>
                  <Text 
                    numberOfLines={1}
                    ellipsizeMode='tail'  
                    style={styles.subtitle}
                  >
                    {this.album.artist}
                  </Text>
                </View>
              </View>
            </View>
          </Image>

          <View style={styles.head}>
            <Text 
              style={styles.headText}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {`${this.album.numberOfSongs}  Tracks`}
            </Text>
          </View>
          <Fab 
            bottom={25}
            onPress={() => this.props.playAlbum(this.album.id, true)}
            icon='shuffle'
          />
        </View>

        <View style={styles.bottomContainer}>
          <ListView 
            dataSource={this.ds}
            renderRow={item => item}
          />
        </View>
        <MiniPlayer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 2,
    backgroundColor: 'white'
  },
  head: {
    backgroundColor: COLORS.darkGray,
    height: 55,
    justifyContent: 'center',
    marginBottom: -55,
    elevation: 2
  },
  headText: {
    color: 'white',
    fontSize: 19,
    marginHorizontal: 15
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15
  },
  header: {
    flex: 1,
    marginHorizontal: 15
  },
  imgCover: {
    flex: 1,
    height: null,
    width: null, 
    resizeMode: 'cover',
  },
  imgCoverContainer: {
    width: 65,
    maxHeight: 65,
  },
  imgTop: {
    flex: 1,
    height: null,
    width: null,
  },
  topContainer: {
    height: 205,
    paddingBottom: 55,
  },
  imgTopOverlay: {
    flex: 1,
    backgroundColor: '#0008',
  },
  navRow: {
    flex: 1,
    height: 40,
    marginTop: StatusBar.currentHeight
  },
  more: {
    position: 'absolute',
    padding: 15,
    top: 0,
    right: 0
  },
  subtitle: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  }
});

const mapStateToProps = ({ player }) => {
  return {
    songs: player.songs,
  };
};

export default connect(mapStateToProps, { playAlbum })(Albums);