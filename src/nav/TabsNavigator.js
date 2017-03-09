import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Tracks from '../components/Tabs/Tracks';
import Artists from '../components/Tabs/Artists';
import Albums from '../components/Tabs/Albums';
import { Header, MenuIconNav, MiniPlayer } from '../components/common';
import MainPlayer from '../components/Player/MainPlayer';
import { COLORS } from './../styles/colors';


const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  label: {
    fontWeight: 'bold'
  },
  indicator: {
    backgroundColor: COLORS.textIcons
  },
  header: {
    marginTop: 10,
  },
  headerTitle: {
    textAlign: 'center'
  },
  navbar: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  noShadow: {
    elevation: 0,
    shadowOpacity: 0,
  },
  tabbar: {
    backgroundColor: COLORS.primary,
  }
});

const TabsNavigator = TabNavigator({
  Tracks: { screen: Tracks },
  Artists: { screen: Artists },
  Albums: { screen: Albums },
}, {
  initialRoute: 'Tracks',
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: COLORS.lightPrimary,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    style: styles.tabbar,
  },
});


export default class Tabs extends Component {
  static navigationOptions = { 
    header: {
      visible: false
    } 
  }

  render() {
    return (
      <View style={styles.flex}>
        <MainPlayer />
        
        <Header 
          title='Local Music' 
          viewStyle={styles.noShadow} 
          left={<MenuIconNav />}
        />
        <TabsNavigator />
        <MiniPlayer />
      </View>
    );
  }
}