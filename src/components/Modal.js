import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from 'react-native-elements'
import Modal from "react-native-modal";
 
export default class ModalView extends Component {  

//   _toggleModal = () =>
//     this.setState({ isModalVisible: !this.state.isModalVisible });

//   setModalVisible(visible) {
//     this.setState({isModalVisible: visible});
//   }

  _renderButton = (text, onPress) => (

      <Button
        title={text}
        loading={false}
        loadingProps={{size: 'small', color: 'white'}}
        buttonStyle={styles.button}
        titleStyle={{fontWeight: 'bold', fontSize: 16}}
        containerStyle={{marginVertical: 15}}        
        underlayColor="transparent"
        onPress={onPress}
      />
  );

  _renderModalContent = () => (
    
    <View style={styles.modalContent}>
        <Text style={{width: 160, fontSize: 15,  }}>{this.props.message}</Text>
        { this._renderButton("확인", () => this.props.myCallback(this.props.isSuccess)) }
    </View>
  );
 
  render() {
    return (
      <View style={styles.container}>                      
        <Modal isVisible={this.props.isModalVisible} 
          style={{flex:1, justifyContent: "center", alignItems: "center",}} >
            {this._renderModalContent()}
        </Modal>
      </View>
    );
  }  
}

const styles = StyleSheet.create({    
    container: {
      flex: 1,
      backgroundColor: 'white',
    },    
    button: {
      marginBottom: 0,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      backgroundColor: 'rgba(90, 154, 230, 1)', 
      width: 160, 
      height: 30,
      borderColor: 'transparent', 
      borderWidth: 0,
    },
    modalContent: {
      width:200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      paddingTop: 20,      
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0
    }
    
});

