import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const StartButton = (props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.bg}>
          <Text style={styles.text}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal: 45,
    paddingVertical: 10
  },
  text: {
    color: 'black',
    fontSize: 20
  }
});

export default StartButton;