import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from './';
import { COLORS } from '../../styles/colors';


class MoreIcon extends Component {
  render() {
    const { 
      onPress, 
      color = COLORS.textIcons, 
      size = 25,
      style = null
    } = this.props;

    return (
      <Touchable 
        onPress={() => onPress(this.refs.icon)}
        style={style}
        rippleColor='#0003'
      >
        <Icon 
          ref='icon'
          name='more-vert' 
          size={size}
          color={color}
        />
      </Touchable>
    );
  }
}

export { MoreIcon };