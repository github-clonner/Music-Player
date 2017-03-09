import React, { Component } from 'react';
import { AsyncStorage, UIManager } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import AppWithNavigationState from './nav/AppNavigation';
import reducers from './reducers';


class MusicPlayer extends Component {
  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  
  componentDidMount() {
    persistStore(this.store, { 
      storage: AsyncStorage,
      blacklist: ['nav']
    });
  }

  store = createStore(
    reducers, 
    undefined, 
    compose(autoRehydrate(), applyMiddleware(ReduxThunk)));

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default MusicPlayer;
