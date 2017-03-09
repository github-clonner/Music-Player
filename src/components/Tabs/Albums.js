import React, { Component } from 'react';
import { ListView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import AlbumGridItem from './AlbumGridItem';


class Albums extends Component {
  state = {
    ds: null
  }
  
  componentWillMount() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      ds: ds.cloneWithRows(this.props.albums)
    });
  }

  renderRow = (album) => {
    return (
        <AlbumGridItem album={album} />
    );
  }
  
  render() {
    return (
      <Animatable.View 
        style={{ flex: 1, backgroundColor: 'white' }}
      >
      {this.props.albums.length < 1 ? (
        <Text style={styles.notfound}>No albums found...</Text>
      ) : (
        <ListView 
          contentContainerStyle={styles.list}
          dataSource={this.state.ds}
          renderRow={this.renderRow}
        />
      )}
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  notfound: {
    textAlign: 'center',
    padding: 25,
    fontSize: 15
  }
});

const mapStateToProps = ({ player }) => {
  return {
    albums: player.albums
  };
};

export default connect(mapStateToProps)(Albums);