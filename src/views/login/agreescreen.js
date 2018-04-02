import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements'
import Header from '../../components/Header'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class AgreeScreen extends Component {

  constructor(props){
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Header/>,
    headerLeft: null,
    headerMode: 'screen',
    headerStyle: {backgroundColor: 'black',}
  })

  render () {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>          
          <View>
            <View style={styles.titleContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.titleText}>회원가입</Text>
              </View>                  
            </View>
            <View style={styles.sview}>
              <ScrollView style={styles.view} >
                  {/* <TextInput 
                  multiline = {true}
                  numberOfLines = {0}
                  value='Messagesssss'
                  /> */}
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
                  <Text >제 1조</Text>
              </ScrollView>
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
                title="동의"
                icon={
                  <Icon
                    name='angle-right'
                    size={20}
                    color='white'
                  />
                }
                iconRight
                iconContainerStyle={{marginRight: 10}}
                titleStyle={{fontWeight: '700'}}
                buttonStyle={styles.button}
                containerStyle={{marginTop: 20}}
                onPress={() => navigation.navigate('CreateAccount')}
              />
            </View>
          </View>         
      </View>
    )
  }
}

export default AgreeScreen;

const styles = StyleSheet.create({
  view: {
    height: SCREEN_HEIGHT - 280,
  },
  sview: {        
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',     
  },
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
  button: {
    backgroundColor: 'rgba(90, 154, 230, 1)', 
    width: 100, 
    borderColor: 'transparent', 
    borderWidth: 0, 
    borderRadius: 30
  },
});