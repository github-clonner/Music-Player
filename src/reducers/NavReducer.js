import { NavigationActions } from 'react-navigation';
import { AppStackNavigator as AppNavigator } from '../nav/AppStackNavigator';
import {
  NAV_BACK,
  NAV_START,
  NAV_PLAYER,
  NAV_SEARCH,
  NAV_SEARCH_RESULT,
  NAV_ALBUM,
  NAV_ARTIST,
  NAV_DRAWER_OPEN,
  NAV_DRAWER_CLOSE
} from '../actions/types';


const INITIAL_STATE = {
  index: 0,
  routes: [
    { key: 'start', routeName: 'StartScreen' },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAV_BACK:
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(), state);

    case NAV_START:
      return AppNavigator.router.getStateForAction(
        NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'TabsScreen' })
        ] })
      );

    case NAV_PLAYER:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PlayerScreen' }), state);

    case NAV_SEARCH:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SearchScreen' }), state);

    case NAV_SEARCH_RESULT:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'SearchResultScreen', 
          params: action.payload }), state);

    case NAV_ALBUM:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'AlbumScreen', 
          params: { album: action.payload } 
        }), state);

    case NAV_ARTIST:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'ArtistScreen', 
          params: { artist: action.payload } 
        }), state);

    case NAV_DRAWER_OPEN:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DrawerOpen' }), state);

    case NAV_DRAWER_CLOSE:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DrawerClose' }), state);

    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};