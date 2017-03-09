import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { navPlayer, playSong, addToQueue, addAsNext } from '../../actions';
import popup from '../../utils/popup';
import { track as defaultCover } from '../../assets/images';


class TrackItem extends Component {
  more = [
    { key: 'play', label: 'Play' },
    { key: 'next', label: 'Play next' },
    { key: 'queue', label: 'Add to queue' },
    //{ key: 'playlist', label: 'Add to playlist' }
  ]

  moreClick = (index) => {
    const { track } = this.props;

    switch (index) {
      case 0:
        this.props.playSong(track);
        break;
      
      case 1:
        this.props.addAsNext(track);
        break;

      case 2:
        this.props.addToQueue(track);
        break;

      default:
        return;
    }
  }

  render() {
    const { track, noimage = false } = this.props;
    const cover = track.album.cover;
    let image = cover.length < 1 ? defaultCover : { uri: cover };
    let infoStyle = null;

    if (noimage) {
      image = null;
      infoStyle = { paddingLeft: 0 };
    }

    return (
      <ListItem 
        title={track.title}
        image={image}
        info={track.artist}
        infoStyle={infoStyle}
        onPress={() => {
          this.props.playSong(track);
          this.props.navPlayer();
        }}
        morePress={(context) => {
          popup(
            context, 
            this.more.map(o => o.label), this.moreClick);
        }}
      />
    );
  }
}

export default connect(() => ({}), 
  { navPlayer, playSong, addToQueue, addAsNext })(TrackItem);