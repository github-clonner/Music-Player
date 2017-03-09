import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from './Touchable';
import { navDrawerOpen } from '../../actions';
import { COLORS } from '../../styles/colors';


const MenuIconNav = connect(() => ({}), { navDrawerOpen })(
  (props) => {
    const { color = COLORS.textIcons } = props;

    return (
      <Touchable onPress={props.navDrawerOpen}>
        <Icon
          name='menu'
          size={25}
          style={{ padding: 15 }}
          color={color}
        />
      </Touchable>
    );
});

export { MenuIconNav };
