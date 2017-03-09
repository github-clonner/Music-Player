import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { navAlbum, playAlbum } from '../../actions';
import popup from '../../utils/popup';
import { album as defaultCover } from '../../assets/images';


class AlbumItem extends Component {
  more = [
    { key: 'play', label: 'Play All' },
    { key: 'shuffle', label: 'Shuffle All' },
    //{ key: 'queue', label: 'Add to queue' },
    //{ key: 'playlist', label: 'Add to playlist' }
  ]

  moreClick = (index) => {
    const { id } = this.props.album;

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

  render() {
    const { artist, cover = '', title } = this.props.album;
    
    return (
      <ListItem 
        title={title}
        image={cover.length < 1 ? defaultCover : { uri: cover }}
        info={artist}
        onPress={() => {
          this.props.navAlbum(this.props.album);
        }}
        morePress={(context) => {
          popup(
            context, 
            this.more.map(o => o.label), 
            this.moreClick);
        }}
      />
    );
  }
}

export default connect(() => ({}), { navAlbum, playAlbum })(AlbumItem);