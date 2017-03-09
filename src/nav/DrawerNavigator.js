import { DrawerNavigator } from 'react-navigation';
import Tabs from './TabsNavigator';
import Drawer from '../components/Drawer/Drawer';


export default DrawerNavigator({
  TabsScreen: { 
    screen: Tabs,
  }
}, {
  contentComponent: Drawer,
  drawerWidth: 300,
});