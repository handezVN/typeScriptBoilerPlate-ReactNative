import {View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Pressable , TextInput} from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';

const UsersScreen = ({navigation}:any) => {
  const newRoom = () =>{
    const roomID:string =   generateString(12);
    navigation.navigate('Zoom',{
      roomID : roomID
    });
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [code,setCode] = useState('');
  const joinRoom =()=>{
    setModalVisible(!modalVisible);
    navigation.navigate('Zoom',{
      roomID : code
    });
  }

  
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function generateString(length:number) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result.trim();
    }
  return (
    <View style={{flex: 1 , justifyContent:'center', alignItems:'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Input Room Code</Text>
            <TextInput placeholder='Room code' onChangeText={(t)=>setCode(t)} value={code}></TextInput>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.cancelTextStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonSubmit]}
              onPress={() => joinRoom()}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
        <TouchableOpacity style={styles.btn}>
          <Text style={{fontSize:16, fontWeight:'600', color:'white'}} onPress={newRoom}>Cuộc họp mới</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {backgroundColor:'white',}]} onPress={()=>setModalVisible(true)}>
          <Text style={{fontSize:16, fontWeight:'600', color:'#0089CC'}}>Tham gia cuộc họp</Text>
        </TouchableOpacity>
    </View>
  );
};

export default UsersScreen;
const styles = StyleSheet.create({
  btn :{height:40, width:'100%', backgroundColor:'#0089CC', justifyContent:'center', alignItems:'center'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'80%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:100,marginHorizontal:10
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderColor:'#0089CC'
  },
  buttonSubmit:{
    backgroundColor:'#0089CC'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})