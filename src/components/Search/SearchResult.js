import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import TrackItem from '../Tabs/TrackItem';
import ArtistItem from '../Tabs/ArtistItem';
import { Header } from '../common';
import { logo } from '../../assets/images';


class SearchResult extends Component {
  static navigationOptions = {
    header: {
      visible: false
    },
  }

  state = {
    dataSource: null,
  }
  
  componentWillMount() {
    const { artistsData, tracksData } = this.props.navigation.state.params;

    const artists = artistsData.map(artist => <ArtistItem artist={artist} image={logo} />);
    const tracks = tracksData.map(track => <TrackItem track={track} />);
    
    const result = artists.concat(tracks);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows(result) });
  }

  render() {
    return (
      <View style={styles.view}>
        <Header 
          right={null}
          title={`Search: ${this.props.navigation.state.params.searchText}`}
          viewStyle={styles.headerStyle}
        />
        <Animatable.View animation='fadeInUp'>
          <ListView 
            dataSource={this.state.dataSource}
            renderRow={item => item}
            style={{ backgroundColor: 'white' }}
          />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: 'flex-start'
  },
  view: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default SearchResult;