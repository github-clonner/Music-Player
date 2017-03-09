import React, { Component } from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';
import { Touchable, MoreIcon } from '../common';
import { COLORS } from '../../styles/colors';


export default class ListItem extends Component {
  render = () => {
    const { title, image, info, onPress, morePress, infoStyle } = this.props;
    
    return (
      <View style={styles.row}>
        <Touchable 
          onPress={onPress} 
          style={styles.song}
        >
          <Image 
            source={image}
            style={styles.img}
          />
          <View style={[styles.textContainer, infoStyle]} >
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
              {info}
            </Text>
          </View>
        </Touchable>

        <MoreIcon 
          onPress={morePress}
          style={styles.icon}
          color={COLORS.secondaryText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artist: {
    color: COLORS.secondaryText,
    fontSize: 11
  },
  icon: {
    padding: 15
  },
  img: {
    height: 40,
    width: 40,
    resizeMode: 'cover'
  },
  row: {
    alignItems: 'center',
    borderColor: COLORS.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  song: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 15
  },
  textContainer: {
    paddingHorizontal: 12,
    marginRight: 15
  },
  title: {
    color: COLORS.primaryText,
    marginRight: 10,
    fontSize: 15
  }
});
