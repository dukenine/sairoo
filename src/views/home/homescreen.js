import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements'
import Header from '../components/Header'

import Icon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {

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
        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center',}}>

          <View style={styles.topContainer}>
            <View style={{paddingLeft: 10, borderWidth: 1, borderColor: '#d6d7da', }}>
              <TouchableOpacity style={{flexDirection: 'row',  }} >
                <Icon
                  name="md-paper"
                  size={80}
                  style={{paddingRight: 10}}
                />
                <Text style={styles.ticketText}>
                  대화권 10장
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', marginTop:10, }} >
                <SimpleIcon
                  name="present"
                  size={70}
                  style={{paddingRight: 10}}
                />
                <Text style={styles.presentText}>
                  무료 대화권 10장
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.topLine}/>
            <View style={styles.viewContainer}>
              <TouchableOpacity  >
                <Icon
                  name="ios-card"
                  size={80}
                />
                <Text style={styles.viewText}>
                  결제하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>          
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.centerContainer}>
          <View style={styles.viewContainer}>
            <TouchableOpacity  >
              <Icon
                name="md-contacts"
                size={80}
              />
              <Text style={styles.viewText}>
                매칭
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topLine}/>
          <View style={styles.viewContainer}>
            <TouchableOpacity  >
              <Icon
                name="ios-chatbubbles-outline"
                size={80}
              />
              <Text style={styles.viewText}>
                채팅
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.horizontalLine} />
       
        <View style={styles.bottomContainer}>
          <View style={{flex:1}}>
            <TouchableOpacity style={{flexDirection: 'row',  }} >
              <SimpleIcon
                name="diamond"
                size={70} 
                style={{paddingRight: 10}}
              />
              <Text style={styles.diamondText}>
                프리미엄의 혜택을 누려보세요
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.periodContainer}>
          <View style={{borderWidth: 1,
    borderColor: '#d6d7da',   }} >
            
            <Text style={styles.diamondText}>
              프리미엄의 혜택을 누려보세요
            </Text>
            
          </View>
        </View>

      </View>
    )
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  view: {
    height: SCREEN_HEIGHT - 280,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
    // marginRight: 15,
  },
  viewContainer: {
    flex: 1,    
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d6d7da',     
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    width: 2, 
    height: 150, 
    backgroundColor: '#8C8C8C', 
    marginVertical: 10,
  },
  ticketText: {
    width: 100,
    fontSize: 18,
    padding: 15,
  },
  presentText: {
    width: 130,
    fontSize: 18,
    padding: 15,
  },
  viewText: {    
    marginVertical: 10,
    fontSize: 18,
    textAlign: 'center',    
  },
  horizontalLine: {    
    height: 2,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#8C8C8C',     
  },
  centerContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10,
    // marginLeft: 15,
    // marginRight: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',    
    marginTop: 20,
    marginLeft: 25,
    // marginRight: 15,
  },
  diamondText: {    
    fontSize: 18,
    padding: 15,
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',    
    marginTop: 10,
    // marginRight: 15,
  },
  button: {
    backgroundColor: 'rgba(90, 154, 230, 1)', 
    width: 100, 
    borderColor: 'transparent', 
    borderWidth: 0, 
    borderRadius: 30
  },
});