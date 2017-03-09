import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { navAlbum } from '../../actions';
import { album as defaultCover } from '../../assets/images';
import { COLORS } from '../../styles/colors';


class AlbumGridItem extends Component {
  render() {
    const { artist, cover = '', title } = this.props.album;
    
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          this.props.navAlbum(this.props.album);
        }}
      >
        <View style={styles.thumbContainer}>
          <Image 
            style={styles.thumb} 
            source={cover.length < 1 ? defaultCover : { uri: cover }} 
          />
        </View>
        <View style={styles.textContainer}>
          <Text 
            style={styles.title} 
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {title}
          </Text>
          <Text 
            style={styles.artist}
            numberOfLines={1} 
          >
            {artist}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  artist: {
    color: COLORS.secondaryText,
    fontSize: 11
  },
  item: {
    backgroundColor: 'white',
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    elevation: 4,
    margin: 5,
    width: 155,
    height: 170,
  },
  thumb: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  },
  thumbContainer: {
    width: 153,
    height: 130
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  title: {
    color: COLORS.primaryText,
    marginRight: 10,
    fontSize: 13
  }
});

export default connect(() => ({}), { navAlbum })(AlbumGridItem);