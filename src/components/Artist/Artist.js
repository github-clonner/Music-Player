import React, { Component } from 'react';
import { ListView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Header, MiniPlayer } from '../common';
import AlbumItem from '../Tabs/AlbumItem';
import TrackItem from '../Tabs/TrackItem';
import { COLORS } from '../../styles/colors';


class Artist extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  componentWillMount() {
    const { artist } = this.props.navigation.state.params;
    const albums = this.props.albums.filter(album => 
      artist.albumsIds.indexOf(album.id) !== -1);

    const tracks = this.props.songs.filter(track => 
      track.artist === artist.name);

    const map = { Albums: albums, Tracks: tracks };

    const ds = new ListView.DataSource({ 
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.ds = ds.cloneWithRowsAndSections(map);
  }

  renderRow = (item, section) => {
    if (section === 'Albums') return <AlbumItem album={item} />;
    return <TrackItem track={item} noimage />;
  }

  renderSectionHeader = (data, head) => {
    return (
      <Text style={styles.sectionHead}>{head}</Text>
    );
  }
  
  render() {
    return (
      <Animatable.View 
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <Header 
          right={null}
          title={`${this.props.navigation.state.params.artist.name}`}
          viewStyle={styles.headerStyle}
        />
        <ListView 
          dataSource={this.ds}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
        <MiniPlayer />
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: 'flex-start'
  },
  sectionHead: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 17,
    color: COLORS.darkPrimary,
    backgroundColor: COLORS.lightPrimary
  },
});

const mapStateToProps = ({ player }) => {
  return {
    albums: player.albums,
    songs: player.songs
  };
};

export default connect(mapStateToProps)(Artist);