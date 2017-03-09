import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Touchable } from './Touchable';
import { navSearch } from '../../actions';
import { COLORS } from '../../styles/colors';


const SearchIconNav = connect(() => ({}), { navSearch })(
  (props) => {
    return (
      <Touchable onPress={props.navSearch}>
        <Icon
          name='search'
          size={25}
          style={{ padding: 15 }}
          color={COLORS.textIcons}
        />
      </Touchable>
    );
});

export { SearchIconNav };
