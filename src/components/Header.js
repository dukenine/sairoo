import React, { Component } from "react";
import { Text, View } from "react-native";
 
export default class Header extends Component {  
 
  render() {
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{            
            fontSize: 20,
            fontWeight: '700',
            color: 'white',
        }}>SAIROO</Text>
    </View>
    );
  }  
}

