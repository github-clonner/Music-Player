import { StackNavigator } from 'react-navigation';

import DrawerNavigator from './DrawerNavigator';
import Album from '../components/Album/Album';
import Artist from '../components/Artist/Artist';
import Start from '../components/Start/Start';
import Player from '../components/Player/Player';
import Search from '../components/Search/Search';
import SearchResult from '../components/Search/SearchResult';


const routesConig = {
  AlbumScreen: { screen: Album },
  ArtistScreen: { screen: Artist },
  PlayerScreen: { screen: Player },
  SearchScreen: { screen: Search },
  SearchResultScreen: { screen: SearchResult },
  StartScreen: { screen: Start },
  TabsScreen: { screen: DrawerNavigator, 
    navigationOptions: {
      header: {
        visible: false
      }
    } },
};

const stackNavigatorConfiguration = {
  initialRouteName: 'TabsScreen'
};

export const AppStackNavigator = 
  StackNavigator(routesConig, stackNavigatorConfiguration);