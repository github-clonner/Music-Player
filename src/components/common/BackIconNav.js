import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from './Touchable';
import { navBack } from '../../actions';
import { COLORS } from '../../styles/colors';


const BackIconNav = connect(() => ({}), { navBack })(
  (props) => {
    const { color = COLORS.textIcons } = props;

    return (
      <Touchable onPress={props.navBack}>
        <Icon
          name='arrow-back'
          size={25}
          style={{ padding: 15 }}
          color={color}
        />
      </Touchable>
    );
});

export { BackIconNav };
