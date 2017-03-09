import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../common';
import { navSearchResult } from '../../actions';

import TrackItem from '../Tabs/TrackItem';
import ArtistItem from '../Tabs/ArtistItem';
import { artist as artistImage } from '../../assets/images';
import { COLORS } from '../../styles/colors';


class Search extends Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  state = {
    artistsData: [],
    tracksData: [],
    searchText: ''
  }

  search = () => {
    const { searchText } = this.state;

    if (searchText.length < 1) {
      this.setState({ artistsData: [], tracksData: [] });
      return;
    }

    const { artists, songs } = this.props;

    const artistsData = artists.filter(artist => 
        artist.name.toLowerCase().includes(searchText.toLowerCase()));

    const tracksData = songs.filter(song => 
        song.title.toLowerCase().includes(searchText.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchText.toLowerCase()));

    this.setState({ artistsData, tracksData });
  }

  renderSearchMore = () => {
    const { artistsData, tracksData } = this.state;

    if (artistsData.length < 1 && tracksData.length < 1) {
      return null;
    }
    return (
      <TouchableHighlight
        onPress={() => this.props.navSearchResult({ ...this.state })}
        style={styles.more}
        underlayColor='#0001'
      >
        <Text style={styles.showAll}>Show all results</Text>
      </TouchableHighlight>
    );
  }
  
  render() {
    let key = 0;
    const items = this.state.artistsData.slice(0, 4).map(artist => 
        (<ArtistItem key={++key} artist={artist} image={artistImage} />))
      .concat(this.state.tracksData.slice(0, 4).map(track => 
        (<TrackItem key={++key} track={track} />)))
      .slice(0, 4);


    return (
      <View style={styles.view}>
        <Header 
          mid={(
            <TextInput
              ref='input'
              autoFocus
              disableFullscreenUI
              onChangeText={searchText => this.setState({ searchText }, this.search)}
              style={styles.text}
              placeholder={'Type track or artist...'}
              placeholderTextColor={COLORS.lightPrimary}
              underlineColorAndroid='transparent'
              value={this.state.searchText}
            />
          )}
          right={(
            <Icon 
              name={this.state.searchText.length > 0 ? 'clear' : 'search'}
              size={25}
              style={{ padding: 15 }}
              onPress={() => {
                this.setState({ searchText: '' }, this.search);
                this.refs.input.focus();
              }}
              color={COLORS.textIcons}
            />
          )}
        />
        <ScrollView 
          style={styles.view}
        >
          {items}
          
          {this.renderSearchMore()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  more: {
    padding: 15,
    paddingLeft: 67
  },
  showAll: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold'
  },
  text: {
    color: COLORS.textIcons,
    fontSize: 20,
    flex: 1
  },
  view: {
    flex: 1,
    backgroundColor: 'white',
  }
});


const mapStateToProps = ({ player }) => {
  const { albums, artists, songs } = player;

  return { albums, artists, songs };
};

export default connect(mapStateToProps, { navSearchResult })(Search);