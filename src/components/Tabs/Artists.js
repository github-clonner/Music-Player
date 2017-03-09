import React, { Component } from 'react';
import { ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import ArtistItem from './ArtistItem';


class Artists extends Component {
  state = {
    ds: null
  }
  
  componentWillMount() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      ds: ds.cloneWithRows(this.props.artists)
    });
  }

  renderRow(artist) {
    return (
      <ArtistItem 
        artist={artist} 
      />
    );
  }
  
  render() {
    return (
      <Animatable.View 
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        {this.props.artists.length < 1 ? (
          <Text style={{ textAlign: 'center', padding: 25, fontSize: 15 }}>
            No artists found...
          </Text>
        ) : (
          <ListView 
            dataSource={this.state.ds}
            renderRow={this.renderRow}
          />
        )}
      </Animatable.View>
    );
  }
}

const mapStateToProps = ({ player }) => {
  return {
    artists: player.artists
  };
};

export default connect(mapStateToProps)(Artists);