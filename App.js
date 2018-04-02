import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Platform,
  AsyncStorage,
} from 'react-native';
import SairooNavigation from './src/Navigation/SairooNavigation';
import { bgStatusBar, bgHeader } from './src/styles';

const ACCESS_TOKEN = 'access_token';
const USER_INFO = 'user_info';
const CHECK_BOX = 'check_box';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: '',
      userId: '',
      password: '',
      saveChecked: false,
      autoChecked: false,
    };
  }

  async componentWillMount() {
    
    this.getUser();
  }

  async getUser() {
    try {
      const user = await AsyncStorage.getItem(USER_INFO);
      const checkbox = await AsyncStorage.getItem(CHECK_BOX);      
      let check = checkbox ? JSON.parse(checkbox) : checkbox;
     
      this.setState({
        userInfo: user,
        saveChecked: check ? check.saveChecked : false,
        autoChecked: check ? check.autoChecked : false,
      });      
      if (check.saveChecked) {
        let userId = check.userId;
        this.setState({userId: userId});
      }
    } catch(error) {
      console.log("getUser err: " + error);
    }
  }

  render() {

    const screenProps = {
      userInfo,
      userId,
      password,
      saveChecked,
      autoChecked,
    } = this.state;

    return (
      <View style={styles.container}>
      <StatusBar
      translucent
      backgroundColor={bgStatusBar}
      animated
      />
      <SairooNavigation screenProps={screenProps} />
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
