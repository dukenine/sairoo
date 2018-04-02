import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Font } from 'expo';
import { Input, Button, } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header'
import ModalView from '../../components/Modal';
import { Config } from '../../lib/properties'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SignupScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      userId: '',
      isUserIdValid: true,
      password: '',
      isPasswordValid: true,
      passwordConfirm: '',
      isPasswordConfirmValid: true,
      email: '',
      isEmailValid: true,
      birthday: '',
      isBirthday: true,
      login_failed: false,
      showLoading: false,
      saveChecked: false,
      autoChecked: false,
      isConfirmationValid: true,
      message: '',
      isSuccess: false,
      isModalVisible: false,
    };

    this.setSelectedType = this.setSelectedType.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.validatePassword = this.onValidatePassword.bind(this);    
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../../../assets/fonts/Georgia.ttf'),
      'regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../../../assets/fonts/Montserrat-Light.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Header/>,    
    headerLeft: null,
    headerMode: 'screen',
    headerStyle: {backgroundColor: 'black',}
  })

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

  onValidatePassword() {
    const { password } = this.state;
    const isPasswordValid = (password.length >= 6 && password.length < 17);
    this.setState({ isPasswordValid });
    isPasswordValid || this.passwordInput.shake();
    return isPasswordValid;
  }

  onValidateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  onValidateBirthday(birthday) {
    var re = /^[1-2]{1}[0-9]{3}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}$/;

    return re.test(birthday);
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType })

  setModalVisible(visible) {
    this.setState({isModalVisible: visible});
  }

  myCallback(success) {
    this.setState({isModalVisible: false});
    if (success) {
      const { navigation } = this.props;
      navigation.navigate('Login');
    }    
  }

  onSignUp() {
    const {
      userId,
      email,
      password,
      passwordConfirm,
      birthday,
      isModalVisible
    } = this.state;
    this.setState({ isLoading: true });
    
    setTimeout(() => {
      // LayoutAnimation.easeInEaseOut();
      this.setState({isSuccess: false})

      if (!this.onValidateUserId(userId)) {
        this.setState({message: '아이디를 입력하세요(6~16)'})        
        this.setModalVisible(!isModalVisible);
      } else if (!this.onValidatePassword(password)) {
        this.setState({message: '비밀번호를 입력하세요(6~16)'})
        this.setModalVisible(!isModalVisible);
      } else if (password !== passwordConfirm) {
        this.setState({message: '비밀번호가 일치하지 않습니다'})
        this.setModalVisible(!isModalVisible);
      } else if (!this.onValidateEmail(email)) {
        this.emailInput.shake();
        this.setState({message: '이메일 형식이 다릅니다'})
        this.setModalVisible(!isModalVisible);
      } else if (!this.onValidateBirthday(birthday)) {
        this.birthdayInput.shake();
        this.setState({message: '생년월일 형식이 다릅니다'})
        this.setModalVisible(!isModalVisible);
      } else {  // 성공
        
        let body = {
          request: {
            id: userId,
            password: passwordConfirm,
            email:email,
            birth: birthday,
          }        
        };

        this.setState({          
          isPasswordConfirmValid: true,
          isEmailValid: true,
          isBirthday: true,          
        });
        this.onSignUpReqeust(body, isModalVisible);
      }
      // this.setState({
      //   isLoading: false,
      //   isUserIdValid: this.onValidateUserId(userId),
      //   isEmailValid: this.onValidateEmail(email),
      //   isPasswordValid: password.length >= 6,
      //   isPasswordConfirmValid: password == passwordConfirm ,
      //   isConfirmationValid: this.onValidateBirthday(birthday) ,
      // });
    }, 0);
  }

  onSignUpReqeust(body, isModalVisible) {

    const URL = Config.protocol + Config.ip + ":" + Config.port;

    return fetch(URL + Config.signUp, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorCode == 0) {
        this.setState({
          isLoading: false, 
          isSuccess: true,
          message: '회원가입이 성공적으로 진행되었습니다',
        });
        this.setModalVisible(!isModalVisible);
      } else {

      }
    })
    .catch((error) =>{
        console.error(error);
    });
  }

  render() {
    const { 
      isLoading, 
      selectedType, 
      userId, 
      isUserIdValid, 
      password, 
      isPasswordValid,
      passwordConfirm,
      isPasswordConfirmValid,
      email,
      isEmailValid,
      birthday,
      isBirthday,
      isConfirmationValid, 
      showLoading, 
      message, 
      isSuccess,
      isModalVisible } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
          {this.state.fontLoaded ?           
              <KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={styles.loginContainer} behavior='padding'>
              <View>
                <ModalView isModalVisible={isModalVisible} message={message} isSuccess={isSuccess} myCallback={this.myCallback.bind(this)} />
              </View>

              <View style={styles.titleContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.titleText}>회원가입</Text>
                </View>                  
              </View>
              <ScrollView style = {{flex: 1, }} ref = 'scroll'>
                <View style={styles.formContainer}>
                  <View >
                    <Text style={styles.text}>아이디</Text>
                    <Input
                      width={230}
                      leftIcon={
                          <Icon
                          name='user-o'
                          color='rgba(92, 209, 229, 1)'
                          size={25}
                          />
                      }
                      value={userId}
                      inputStyle={{marginLeft: 10, color: 'black'}}
                      keyboardAppearance="light"
                      placeholder="아이디를 입력하세요(6~16자)"
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
                      placeholderTextColor="rgba(92, 209, 229, 1)"                      
                      />
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Text style={styles.text}>비밀번호</Text>
                    <Input
                        width={230}
                        leftIcon={
                            <Icon
                            name='lock'
                            color='rgba(92, 209, 229, 1)'
                            size={25}
                            />
                        }
                        onChangeText={(password) => this.setState({password})}
                        value={password}
                        inputStyle={{marginLeft: 10, color: 'black'}}
                        secureTextEntry={true}
                        keyboardAppearance="light"
                        placeholder="비밀번호를 입력하세요(6~16자)"
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}                  
                        returnKeyType="done"
                        ref={ input => this.passwordInput = input}
                        onSubmitEditing={() => {
                          this.setState({isPasswordValid: this.onValidatePassword(password)});
                          this.confirmationInput.focus();
                        }}
                        blurOnSubmit={false}
                        placeholderTextColor="rgba(92, 209, 229, 1)"
                    />
                  </View>
                  <View >
                    <Text style={styles.text}>비밀번호 확인</Text>
                    <Input
                        width={230}
                        leftIcon={
                            <Icon
                            name='lock'
                            color='rgba(92, 209, 229, 1)'
                            size={25}
                            />
                        }
                        onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                        value={passwordConfirm}
                        inputStyle={{marginLeft: 10, color: 'black'}}
                        secureTextEntry={true}
                        keyboardAppearance="light"
                        placeholder="비밀번호를 다시 입력하세요"
                        autoCapitalize="none"
                        autoCorrect={false}                  
                        returnKeyType="done"
                        ref={input => this.confirmationInput = input}
                        onSubmitEditing={() => {
                          this.setState({isPasswordConfirmValid: password == passwordConfirm});
                          this.emailInput.focus();
                        }}
                        blurOnSubmit={false}
                        placeholderTextColor="rgba(92, 209, 229, 1)"                        
                    />
                  </View>                  
                  <View style={{marginVertical: 10}}>
                    <Text style={styles.text}>이메일</Text>
                    <Input
                        width={230}
                        leftIcon={
                            <Icon
                            name='envelope-o'
                            color='rgba(92, 209, 229, 1)'
                            size={25}
                            />
                        }
                        onChangeText={email => this.setState({email})}
                        value={email}
                        inputStyle={{marginLeft: 10, color: 'black'}}                    
                        keyboardAppearance="light"
                        placeholder="이메일을 입력하세요"
                        autoCapitalize="none"
                        autoCorrect={false}                  
                        returnKeyType="done"
                        ref={input => this.emailInput = input}                        
                        onSubmitEditing={() => this.birthdayInput.focus()}
                        blurOnSubmit={false}
                        placeholderTextColor="rgba(92, 209, 229, 1)"                                 
                        onFocus={() => {
                          setTimeout(() => {
                            this.refs['scroll'].scrollTo({y: 80, animated: true})
                          }, 200);
                        }}
                        displayError={true}
                        errorStyle={{textAlign: 'left', fontSize: 12, width:300}}                        
                        errorMessage="* 비밀번호 찾기시 이용되오니 꼭 사용 가능한 이메일을 입력하시기 바랍니다"
                    />
                  </View>
                  <View >
                    <Text style={styles.text}>생년월일</Text>
                    <Input
                        width={230}
                        leftIcon={
                            <Icon
                            name='birthday-cake'
                            color='rgba(92, 209, 229, 1)'
                            size={25}
                            />
                        }
                        onChangeText={birthday => this.setState({birthday})}
                        value={birthday}
                        inputStyle={{marginLeft: 10, color:'black', }}
                        keyboardAppearance="light"
                        placeholder="ex) 20010301"
                        autoCapitalize="none"
                        autoCorrect={false}                  
                        returnKeyType="done"
                        ref={input => this.birthdayInput = input}         
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        placeholderTextColor="rgba(92, 209, 229, 1)"                        
                        onFocus={() => {
                          setTimeout(() => {
                            this.refs['scroll'].scrollTo({y: 160, animated: true})
                          }, 200);
                        }}
                    />
                  </View>                  
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Button
                    title="이전"
                    icon={
                      <Icon
                        name='angle-left'
                        size={20}
                        color='white'
                      />
                    }
                    iconContainerStyle={{marginRight: 10}}
                    titleStyle={{fontWeight: '700'}}
                    buttonStyle={styles.button}
                    containerStyle={{marginTop: 20}}
                    onPress={() => navigation.goBack(null)}
                  />
                  <Button
                    title="가입"                    
                    iconContainerStyle={{marginRight: 10}}
                    titleStyle={{fontWeight: '700'}}
                    buttonStyle={styles.button}
                    containerStyle={{marginTop: 20}}
                    onPress={this.onSignUp}
                  />
                </View>     
                </ScrollView>
                
              </KeyboardAvoidingView>
          :
          <Text>Loading...</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {    
    width: SCREEN_WIDTH - 30,
    alignItems: 'center', 
    height: SCREEN_HEIGHT - 260,    
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
  text: {
    color: 'rgba(92, 209, 229, 1)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgba(90, 154, 230, 1)', 
    width: 100, 
    borderColor: 'transparent', 
    borderWidth: 0, 
    borderRadius: 30
  },

});
