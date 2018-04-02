import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements'
import Header from '../../components/Header'
import ModalView from '../../components/Modal';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class MyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isUserIdValid: true,
      password: '',
      isPasswordValid: true,
      newPassword: '',
      newPasswordConfirm: '',
      isNewPasswordValid: true,
      isNewPasswordConfirmValid: true,
      email: '',
      isEmailValid: true,
      birthday: '',
      isBirthday: true,
      login_failed: false,
      showLoading: false,
      isConfirmationValid: true,
      message: '',
      isSuccess: false,
      isModalVisible: false,
    };

  }

  myCallback(success) {
    this.setState({ isModalVisible: false });
    if (success) {
      const { navigation } = this.props;
      navigation.navigate('Login');
    }
  }

  render() {
    const {
      password,
      email,
      birthday,
      newPassword,
      newPasswordConfirm,
      message,
      isSuccess,
      isModalVisible } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>내정보 변경</Text>
        </View>

        

        <KeyboardAvoidingView style={{flex: 1,}}  behavior='position'>


        <ScrollView >
          
            <View style={styles.formContainer}>
              <Input
                containerStyle={styles.input}
                onChangeText={(password) => this.setState({ password })}
                value={password}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="현재 비밀번호(변경시 필수 입력)"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                ref={input => this.passwordInput = input}
                onSubmitEditing={() => {
                  this.setState({ isPasswordValid: this.onValidatePassword(password) });
                  // this.confirmationInput.focus();
                }}
                blurOnSubmit={false}
              />
              <Input
                containerStyle={styles.input}
                value={email}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                keyboardAppearance="light"
                placeholder="이메일 변경"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                ref={input => this.emailInput = input}
                onSubmitEditing={() => this.birthdayInput.focus()}
                onChangeText={userId => this.setState({ userId })}
                blurOnSubmit={false}
              />
              <Input
                containerStyle={styles.input}
                value={birthday}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                keyboardAppearance="light"
                placeholder="생년월일 변경"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                ref={input => this.birthdayInput = input}
                onSubmitEditing={() => this.newPasswordInput.focus()}
                onChangeText={userId => this.setState({ userId })}
                blurOnSubmit={false}
              />
              <Input
                containerStyle={styles.input}
                onChangeText={(newPassword) => this.setState({ newPassword })}
                value={newPassword}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="새 비밀번호"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                ref={input => this.newPasswordInput = input}
                onSubmitEditing={() => {
                  this.setState({ isPasswordValid: this.onValidatePassword(password) });
                  // this.confirmationInput.focus();
                }}
                blurOnSubmit={false}
              />
              <Input
                containerStyle={styles.input}
                onChangeText={(newPasswordConfirm) => this.setState({ newPasswordConfirm })}
                value={newPasswordConfirm}
                inputStyle={{ marginLeft: 10, color: 'black' }}
                secureTextEntry={true}
                keyboardAppearance="light"
                placeholder="새 비밀번호 확인"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                ref={input => this.newPasswordConfirmInput = input}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
          <Button
            title="저장"
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.button}
            onPress={() => navigation.goBack(null)}
          />
          <Button
            title="취소"
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('CreateAccount')}
          />
        </View>
      </View>
    )
  }
}

export default MyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    // fontFamily: 'regular',
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(93, 93, 93, 1)",
    height: 50,
    width: SCREEN_WIDTH - 50,
    marginVertical: 10
  },
  button: {
    width: 150,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5
  },
});