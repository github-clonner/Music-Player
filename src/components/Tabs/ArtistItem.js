import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { navArtist, playArtist } from '../../actions';
import popup from '../../utils/popup';


class ArtistItem extends Component {
  more = [
    { key: 'play', label: 'Play' },
    { key: 'shuffle', label: 'Shuffle' },
    //{ key: 'queue', label: 'Add to queue' },
    //{ key: 'playlist', label: 'Add to playlist' }
  ]

  moreClick = (index) => {
    const { artist } = this.props;

    switch (index) {
      case 0:
        this.props.playArtist(artist);
        break;
      
      case 1:
        this.props.playArtist(artist, true);
        break;

      default:
        return;
    }
  }

  render() {
    const { artist, image = null } = this.props;
    const albumsCount = artist.albumsIds.length;

    const tracks = `${artist.tracks} ${artist.tracks === 1 ? 'track' : 'tracks'}`;
    const albums = `${albumsCount} ${albumsCount === 1 ? 'album' : 'albums'}`;
    const info = `${albums} - ${tracks}`;
    
    return (
      <ListItem 
        title={artist.name}
        info={info}
        infoStyle={image === null ? { paddingLeft: 0 } : null}
        image={image}
        onPress={() => {
          this.props.navArtist(artist);
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

export default connect(() => ({}), { navArtist, playArtist })(ArtistItem);