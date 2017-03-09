import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { Touchable } from './Touchable';
import { COLORS } from '../../styles/colors';


class Fab extends Component {
  render = () => {
    const { 
      onPress, 
      icon = 'share', 
      color = COLORS.accent,
      rippleColor = '#fff7',
      top = null,
      bottom = 50
    } = this.props;

    return (
      <Animatable.View 
        style={[styles.fab, { bottom, top }]}
        animation='zoomIn' 
        delay={500}
        duration={500}
        ref='fab'
      >
        <Touchable 
          onPress={() => { onPress(); this.refs.fab.pulse(300); }}
          rippleColor={rippleColor}
          style={[styles.ball, { backgroundColor: color }]}
        >
          <Icon
            name={icon}
            size={30}
            style={{ paddingTop: 13, paddingLeft: 13 }}
            color={'white'}
          />
        </Touchable>
      </Animatable.View>
    );
  };
}

const styles = StyleSheet.create({
  ball: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  fab: {
    position: 'absolute',
    borderRadius: 28,
    right: 23,
    width: 56,
    height: 56,
    elevation: 4,
    zIndex: 1
  },
});

export { Fab };
