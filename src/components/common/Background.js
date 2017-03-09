import React from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import { bg } from '../../assets/images';


const Background = (props) => {
  return (
    <Image
      style={styles.background}
      source={bg}
    >
      {props.children}
    </Image>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

export { Background };