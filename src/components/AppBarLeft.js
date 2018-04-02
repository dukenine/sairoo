import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { headerColor } from '../styles';

const menuIcon = (<Icon name="md-menu" size={40} color={headerColor} />);

const AppBarLeft = ({ navigation }) => (
  <View style={styles.headerLeft}>
    <TouchableOpacity
      onPress={() => navigation.navigate('DrawerOpen')}
    >
      { menuIcon }
    </TouchableOpacity>
  </View>
);

AppBarLeft.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  headerLeft: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});

export default AppBarLeft;
