import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';
import {
  bgHeader,
  headerColor,
  drawerItemColor,
  bgDrawerActiveItem,
  drawerActiveItemColor,
} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../views/login/loginscreen';
import AgreeScreen from '../views/login/agreescreen';
import SignupScreen from '../views/login/signupscreen';
import Home from '../views/Home';
import AppBarLeft from '../components/AppBarLeft';
import PopupBarRight from '../components/PopupBarRight';
import SideMenu from '../components/SideMenu';
import MyScreen from '../views/info/myscreen';


const setNavigationOptions = (idx) => ({
  navigationOptions: ({navigation}) => ({
    headerMode: 'screen',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: headerColor,
    headerLeft: <AppBarLeft navigation={navigation} />,
    headerRight: <PopupBarRight navigation={navigation} />,
    // headerRight: <PopupMenu
    //   labels={['About', 'Credits']}
    //   onPress={(e) => { openOverflowMenuScreens(e, navigation); }}
    // />,      
  }),
});

const stackNavRoutes = {
//   Login: { screen: StackNavigator({ screen: LoginScreen }) },
//   Agree: { screen: StackNavigator({ screen: AgreeScreen }) },
//   CreateAccount: { screen: StackNavigator({ screen: SignupScreen }) },
  MyScreen: { screen: StackNavigator({ screen: MyScreen }) },
  Home: { screen: StackNavigator({ screen: { screen: Home }}, setNavigationOptions(0)) },  
};

const getDrawerWidth = () => Dimensions.get('window').width - (Platform.OS === 'android' ? 56 : 64);

const DrawerStack = DrawerNavigator(
  stackNavRoutes,
  {
    drawerWidth: getDrawerWidth(),
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: drawerActiveItemColor,
      activeBackgroundColor: bgDrawerActiveItem,
      inactiveTintColor: drawerItemColor,
      labelStyle: { fontSize: 14 },
    },
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
});

const styles = StyleSheet.create({
  header: {
    backgroundColor: bgHeader,
    height: 80, 
    paddingTop: 24, 
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerTitle: {
    // marginLeft: 50,
    // alignSelf: 'flex-end',
  },  
});

export default DrawerStack;
