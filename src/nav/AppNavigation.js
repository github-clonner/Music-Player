import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { AppStackNavigator } from './AppStackNavigator';


class AppWithNavigationState extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('backPress', () => {
      const { dispatch, nav } = this.props;
      if (nav.index === 0 && nav.routes[0].index === 0) return false;
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backPress');
  }
  
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppStackNavigator 
        navigation={addNavigationHelpers({ dispatch, state: nav })} 
      />
    );
  }
}

const mapStateToProps = (state) => ({ nav: state.nav });

export default connect(mapStateToProps)(AppWithNavigationState);