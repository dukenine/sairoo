import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,  
} from 'react-native';
import { DrawerItems, } from 'react-navigation';
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import {
  bgDrawerHeader,
  drawerLogoColor,
  drawerActiveItemColor,
  headerColor,
  bgDrawer,
  bgHeader,
} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const SideMenu = (props) => (
  <View style={styles.container}>
    <ScrollView >
      <View style={ styles.header }>
        <View style={ styles.userInfosHolder }>
          <Image style={ styles.avatar } source={require("../images/fe.jpg")} />
          <View style={ styles.userInfos }>
            <Text style={ styles.username }>포비즈</Text>
            <Text style={ styles.usercoin }>코인 : 1000</Text>
          </View>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => props.navigation.navigate('DrawerClose')} >
              <Icon name="md-settings" size={35} color="#000000" style={{paddingRight: 15}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('DrawerClose')} >
              <Icon name="md-close" size={40} color="#000000" />
            </TouchableOpacity>
          </View>        
        </View>
      </View>
      <View style={styles.horizontalLine} />    
      <View >
        <View style={styles.viewBox}>
          <Text style={styles.viewBoxText}>프로필
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('DrawerClose')} >
            <Icon name="md-settings" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
        <List containerStyle={styles.list}>
          {
            myProfile.map((l, i) => (            
              <ListItem
              key={i} 
              title={l.title} 
              rightIcon={ <Icon />}   
              containerStyle={styles.listItem}
              />
            ))
          }
        </List>
      </View>
      <View style={styles.navBar}>
        <Avatar
          large
          rounded
          source={require("../images/fe.jpg")}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Avatar
          large
          rounded
          source={require("../images/fe.jpg")}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Avatar
          large
          rounded
          icon={{name: 'person'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}        
        />
      </View>

      <View style={styles.horizontalLine} />    
      <View >
        <View style={styles.viewBox}>
          <Text style={styles.viewBoxText}>매칭
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('DrawerClose')} >
            <Icon name="md-settings" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
        <List containerStyle={styles.list}>
          {
            matching.map((l, i) => (            
              <ListItem
              key={i} 
              title={l.title} 
              rightIcon={ <Icon />}   
              containerStyle={styles.listItem}
              />
            ))
          }
        </List>
      </View>
      
    </ScrollView>
    <View >
      <Button
        title="로그아웃"
        buttonStyle={{backgroundColor: 'rgba(39, 39, 39, 1)', height: 40, alignSelf: 'stretch', }}
        // containerStyle={{marginTop: 20, }}
        titleStyle={{color: 'white', marginHorizontal: 20}}
      />
    </View>
  </View>
);

const myProfile = [
  {
    title: '대화명 : 홍길동',
  },  
  {
    title: '나이 : 69',
  },
  {
    title: '직업 : 헌터',
  },
  {
    title: '지역 : 서울',
  },
  {
    title: '소개말 : 69를 사랑하는 ...',
  },
]

const matching = [
  {
    title: '성별 : 홍길동',
  },  
  {
    title: '나이 : 69',
  },
  {
    title: '인원수 : 2',
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: headerColor,
  },
  header: {
    flexDirection: 'column',
    paddingTop: 40,     
    paddingLeft: 16,
    height: 130,
    // backgroundColor: bgHeader,
  },
  headerLogo: {
    width: 264,
    height:264,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    // overflow: 'hidden',
    backgroundColor: '#fff',
  },
  subTitle: {
    height: 56,
    paddingTop: 8,
  },
  drawerTitle: {
    color: headerColor,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
  },
  drawerEmail: {
    color: headerColor,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
  },
  userInfosHolder: {
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40
   },
  userInfos: {
    marginLeft: 20,
    height: 70,
    justifyContent: 'center'
  },
  username: {
    color: drawerActiveItemColor,
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 22,
  },
  usercoin: {
    color: drawerActiveItemColor,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
  },
  close: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20
  },
  list: {
    marginTop: 0, 
    borderTopWidth: 0
  },
  listItem: {
    marginTop: -10, 
    marginBottom: -5, 
    borderBottomWidth: 0 
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  horizontalLine: {    
    height: 1,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#8C8C8C',     
  },
  viewBox: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  viewBoxText: {
    flex: 1,    
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewBoxSetting: {
    flex: 1,    
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',    
  }

});

export default SideMenu;
