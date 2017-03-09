import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from '../common/Touchable';
import { COLORS } from '../../styles/colors';


const DrawerItem = (props) => {
  const { 
    onPress, 
    color = COLORS.accent, 
    rippleColor = COLORS.lightPrimary, 
    text, 
    icon 
  } = props;

  return (
    <Touchable 
      onPress={onPress} 
      rippleColor={rippleColor}
      borderless={false}
      style={styles.row}
    >
      <Icon 
        name={icon}
        color={color}
        size={25}
        style={styles.icon}
      />
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 20,
    paddingHorizontal: 25
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: COLORS.secondaryText,
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default DrawerItem;
