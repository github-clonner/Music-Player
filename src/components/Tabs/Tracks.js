import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Fab } from '../common';
import TrackItem from './TrackItem';
import { playAllTracks, loadMusic } from '../../actions';


class Tracks extends Component {
  state = {
    ds: null,
    dataSource: null,
  }
  
  componentWillMount() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      ds,
      dataSource: ds.cloneWithRows(this.props.songs)
    });
  }
  
  componentWillUpdate(nextProps) {
    this.setState({
      dataSource: this.state.ds.cloneWithRows(nextProps.songs)
    });
  }
  
  renderRow = (track) => {
    return (
      <TrackItem 
        track={track} 
      />
    );
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.props.songs.length < 1 ? (
          <Text style={{ textAlign: 'center', padding: 25, fontSize: 15 }}>
            No tracks found...
          </Text>
        ) : (
          <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        )}
        <Fab
          ref='fab'
          bottom={15}
          onPress={() => this.props.playAllTracks(true)}
          icon='shuffle'
        />
      </View>
    );
  }
}


const mapStateToProps = ({ player }) => {
  return {
    songs: player.songs
  };
};

export default connect(mapStateToProps, { playAllTracks, loadMusic })(Tracks);