import React, { Component, PropTypes } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';


class Touchable extends Component {
  static defaultProps = {
    borderless: true,
    rippleColor: '#fff4',
  };

  static propTypes = {
    onPress: PropTypes.func,
    borderless: PropTypes.bool,
    rippleColor: PropTypes.string,
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
  };

  render() {
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      const { onPress, style } = this.props; 

      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={
            TouchableNativeFeedback.Ripple(
              this.props.rippleColor,
              this.props.borderless
            )
          }
        >
          <View style={style}>
            {this.props.children}
          </View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export { Touchable };