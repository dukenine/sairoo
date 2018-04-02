import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Font } from 'expo';
import { Input, Button, CheckBox } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import ModalView from '../../components/Modal';
import { Config } from '../../lib/properties'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ACCESS_TOKEN = 'access_token';
const USER_INFO = 'user_info';
const CHECK_BOX = 'check_box';


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LoginScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      accessToken: null,
      userInfo: '',
      userId: '',
      isUserIdValid: true,
      password: '',
      isPasswordValid: true,
      showLoading: false,
      saveChecked: false,
      autoChecked: false,
      message: '',
      isSuccess: false,
      isModalVisible: false,
    };

    this.setSelectedType = this.setSelectedType.bind(this);    
    this.validatePassword = this.validatePassword.bind(this);
  }

  async componentDidMount() {
    
    await Font.loadAsync({
      'georgia': require('../../../assets/fonts/Georgia.ttf'),
      'regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../../../assets/fonts/Montserrat-Light.ttf'),
    });

    const loginProps = this.props.screenProps;
    this.setState({ 
      fontLoaded: true,
      userInfo: loginProps.userInfo,
      userId: loginProps.userId,
      password: loginProps.password,
      saveChecked: loginProps.saveChecked,
      autoChecked: loginProps.autoChecked
    });
    
    if (loginProps.autoChecked) {
      const { navigate } = this.props.navigation;
      let userArr = JSON.parse(loginProps.userInfo);
      this.setState({userId: userArr.id, password: userArr.password});
      this.onLogin();
    } 
    // this.getUser();
    // this.removeUser();
  }

  componentDidUpdate(_, previousState) {    
    if (previousState.saveChecked !== this.state.saveChecked ) {            
      let value = {
        userId: this.state.userId,
        saveChecked: this.state.saveChecked,
        autoChecked: this.state.autoChecked
      }
      this.storeCheck(JSON.stringify(value));
    } else if (previousState.autoChecked !== this.state.autoChecked ) {            
      let value = {
        userId: this.state.userId,
        saveChecked: this.state.saveChecked,
        autoChecked: this.state.autoChecked
      }
      this.storeCheck(JSON.stringify(value));
    } else if (previousState.userId !== this.state.userId ) {            
      let value = {
        userId: this.state.userId,
        saveChecked: this.state.saveChecked,
        autoChecked: this.state.autoChecked
      }
      this.storeCheck(JSON.stringify(value));
    }
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  onValidateUserId() {
    const { userId } = this.state;
    const isUserIdValid = (userId.length >= 6 && userId.length < 17);
    this.setState({isUserIdValid});
    isUserIdValid || this.userIdInput.shake();
    return isUserIdValid;
  }

  validatePassword() {
    const { password } = this.state;
    const isPasswordValid = (password.length >= 6 && password.length < 17);
    this.setState({ isPasswordValid });
    isPasswordValid || this.passwordInput.shake();
    return isPasswordValid;
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType })

  onLogin() {    
    this.setState({isSuccess: false})
    const { userId, password, isModalVisible } = this.state;
    const isUserIdValid = this.onValidateUserId();
    const isPasswordValid = this.validatePassword();
    
    if (
        isUserIdValid &&
        isPasswordValid
    ) {
        this.setState({ isLoading: true });
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut();

          let body = {
            request: {
              id: userId,
              password: password,
            }        
          };
          this.onLoginReqeust(body, isModalVisible);          
        }, 0);
    }
  }  

  async onLoginReqeust(body, isModalVisible) {
    const URL = Config.protocol + Config.ip + ":" + Config.port;

    try {
      let response = await fetch(URL + Config.logIn, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      let responseJson = await response.json();      
      if (responseJson.errorCode !== 0) {
        this.setState({
          isLoading: false, 
          isSuccess: true,
          message: '로그인에 실패하였습니다 다시 시도해 주세요',
        });
        this.setModalVisible(!isModalVisible);
      } else {
        let accessToken = responseJson.result.accessToken;
        this.storeToken(accessToken);

        let userInfo = JSON.stringify(responseJson.result.userInfo);
        this.storeUser(userInfo);
        
        const { navigation } = this.props;
        navigation.navigate('Home');
      }


    } catch(error) {
      console.error(error);

    }
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);      
    } catch(error) {
      console.log("storeToken err: " + error);
    }
  }

  async getToken() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      this.setState({accessToken: token});
    } catch(error) {
      console.log("getToken err: " + error);
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch(error) {
      console.log("removeToken err: " + error);
    }
  }

  async storeUser(userInfo) {
    try {
      await AsyncStorage.setItem(USER_INFO, userInfo);      
    } catch(error) {
      console.log("storeUser err: " + error);
    }
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

  async removeUser() {
    try {
      await AsyncStorage.removeItem(USER_INFO);
      this.getUser();
    } catch(error) {
      console.log("removeUser err: " + error);
    }
  }

  async storeCheck(checkbox) {
    try {
      await AsyncStorage.setItem(CHECK_BOX, checkbox);
      this.getCheck();
    } catch(error) {
      console.log("storeToken err: " + error);
    }
  }

  async getCheck() {
    try {
      const check = await AsyncStorage.getItem(CHECK_BOX);
      // this.setState({accessToken: token});      
    } catch(error) {
      console.log("getToken err: " + error);
    }
  }

  async removeCheck() {
    try {
      await AsyncStorage.removeItem(CHECK_BOX);
      this.getToken();
    } catch(error) {
      console.log("removeToken err: " + error);
    }
  }

  setModalVisible(visible) {
    this.setState({isModalVisible: visible});
  }

  myCallback(success) {
    this.setState({isModalVisible: false});
  }

  submitLoginCredentials() {
    const { showLoading } = this.state;

    this.setState({
        showLoading: !showLoading
    });
  }

  render() {
    const { isLoading, selectedType, userId, isUserIdValid, password, isPasswordValid, showLoading, message, isSuccess, isModalVisible, saveChecked, autoChecked } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
          horizontal
          pagingEnabled          
          decelerationRate={0.993}
        >
      <View style={styles.container}>
        <View>
          <ModalView isModalVisible={isModalVisible} message={message} isSuccess={isSuccess} myCallback={this.myCallback.bind(this)} />
        </View>
        <ImageBackground
          style={styles.bgImage}
        >
        
          {this.state.fontLoaded ?
            <View>
              <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
                <View style={styles.titleContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleText}>SAIROO</Text>
                  </View>                  
                </View>                
                
                <View style={styles.formContainer}>
                  <View style={{marginVertical: 10}}>
                  <Input
                    width={230}
                    leftIcon={
                        <Icon
                        name='user-o'
                        color='rgba(171, 189, 219, 1)'
                        size={25}
                        />
                    }
                    value={userId}
                    inputStyle={{marginLeft: 10, color: 'white'}}
                    keyboardAppearance="light"
                    placeholder="아이디를 입력하세요"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}                  
                    returnKeyType="next"
                    ref={ input => this.userIdInput = input }                  
                    onSubmitEditing={() => {
                        this.setState({isUserIdValid: this.onValidateUserId(userId)});
                        this.passwordInput.focus();
                    }}
                    onChangeText={userId => this.setState({userId})}
                    blurOnSubmit={false}
                    placeholderTextColor="white"
                    displayError={!isUserIdValid}
                    errorStyle={{textAlign: 'center', fontSize: 12}}
                    errorMessage="아이디를 입력하세요(6~16)"
                    />
                  </View>
                  <View style={{marginVertical: 10}}>
                  <Input
                    width={230}
                    leftIcon={
                        <Icon
                        name='lock'
                        color='rgba(171, 189, 219, 1)'
                        size={25}
                        />
                     }
                    onChangeText={(password) => this.setState({password})}
                    value={password}
                    inputStyle={{marginLeft: 10, color: 'white'}}
                    secureTextEntry={true}
                    keyboardAppearance="light"
                    placeholder="비밀번호를 입력하세요"
                    autoCapitalize="none"
                    autoCorrect={false}                  
                    returnKeyType="done"
                    ref={ input => this.passwordInput = input}
                    onSubmitEditing={this.onLogin.bind(this)}
                    blurOnSubmit={true}
                    placeholderTextColor="white"
                    displayError={!isPasswordValid}
                    errorStyle={{textAlign: 'center', fontSize: 12}}
                    errorMessage="비밀번호를 입력하세요(6~16자)"
                  />
                  </View>
                  
                </View>
                <View >
                  <Button
                    title='로그인'
                    activeOpacity={1}
                    underlayColor="transparent"
                    onPress={this.onLogin.bind(this)}
                    loading={showLoading}
                    loadingProps={{size: 'small', color: 'white'}}
                    //   disabled={ !isUserIdValid && password.length < 8}
                    buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
                    containerStyle={{marginVertical: 10}}
                    titleStyle={{fontWeight: 'bold', color: 'white'}}
                  />
                </View>
                <View style={styles.loginArea}>
                  <CheckBox
                    title='아이디저장'
                    containerStyle={styles.saveCheckbox}
                    textStyle={{ color: 'white',}}
                    checked={this.state.saveChecked}                    
                    onPress={() => {
                      this.setState({saveChecked: !saveChecked});                      
                    }}
                  />
                  <CheckBox
                    title='간편로그인'
                    containerStyle={styles.autoCheckbox}
                    textStyle={{ color: 'white',}}
                    checked={this.state.autoChecked}                    
                    onPress={() => {
                      this.setState({autoChecked: !autoChecked})                      
                    }}
                  />                  
                </View>
              </KeyboardAvoidingView>
              <View style={styles.helpContainer}>
                <Button
                  title={'회원가입'}
                  titleStyle={{color: 'white'}}
                  containerStyle={{marginRight:32}}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  underlayColor='transparent'
                  onPress={() => navigate('Agree')}
                />
                <Button
                  title={'아이디찾기'}
                  titleStyle={{color: 'white'}}
                  containerStyle={{marginRight:32}}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  underlayColor='transparent'
                  onPress={() => console.log('아이디찾기')}
                />
                <Button
                  title={'비밀번호찾기'}
                  titleStyle={{color: 'white'}}
                  buttonStyle={{backgroundColor: 'transparent'}}
                  underlayColor='transparent'
                  onPress={() => console.log('비밀번호찾기')}
                />                          
              </View>
              
            </View>
          :
          <Text>Loading...</Text>
        }
        </ImageBackground>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {    
    width: SCREEN_WIDTH - 30,    
    alignItems: 'center',    
  },  
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  helpContainer: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',    
  },
  loginArea: {
    flexDirection: 'row',    
    justifyContent: 'space-between',
    paddingLeft: 15,
    
  },
  saveCheckbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent', 
    borderWidth: 0,     
  },
  autoCheckbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent', 
    borderWidth: 0,     
  }

});
