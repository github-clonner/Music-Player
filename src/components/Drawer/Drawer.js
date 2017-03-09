import React, { Component } from 'react';
import { 
  Image,
  ScrollView,
  Share,
  StyleSheet, 
  Text,
  View 
} from 'react-native';
import { connect } from 'react-redux';
import { 
  navDrawerClose, 
  navSearch, 
} from '../../actions';
import { drawer as drawerTopImg, logoWhite } from '../../assets/images';
import DrawerItem from './DrawerItem';


class Drawer extends Component {
  render() {
    return (
      <View style={styles.drawer}>
        <View style={styles.top}>
          <Image style={styles.img} source={drawerTopImg} />
          <View style={styles.head}>
            <Image style={styles.logo} source={logoWhite} />
            <Text style={styles.title}>Music Player</Text>
          </View>
        </View>
        <View style={styles.list}>
          <ScrollView>
            <DrawerItem 
              text='Music'
              color='#ff3189'
              rippleColor='#ff31895f'
              icon='audiotrack'
              onPress={() => {
                this.props.navDrawerClose();
              }}
            />

            <DrawerItem 
              text='Search'
              color='#f00'
              rippleColor='#f005'
              icon='search'
              onPress={() => {
                this.props.navDrawerClose();
                this.props.navSearch();
              }}
            />
           
            <DrawerItem 
              text='Share'
              color='#ff6631'
              rippleColor='#ff66315f'
              icon='share'
              onPress={() => {
                Share.share({
                  message: 'I\'ve just tried out the Music Player! Check it out in Google Play Store!',
                  title: 'Music Player'
                }, { dialogTitle: 'Share with friends!' });
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1
  },
  head: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    padding: 25,
    flexDirection: 'row'
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderBottomRightRadius: 30
    
  },
  logo: {
    resizeMode: 'contain',
    width: 30,
    height: 30
  },
  title: {
    color: 'white',
    paddingHorizontal: 25,
    fontSize: 21,
    fontWeight: 'bold',
  },
  top: {
    height: 150,
    elevation: 4,
  }
});

export default connect(() => ({}), { navDrawerClose, navSearch })(Drawer);
