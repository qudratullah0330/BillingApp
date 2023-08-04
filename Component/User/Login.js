import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { View,Text, TextInput, Button, AsyncStorage, Alert,StyleSheet,TouchableOpacity,Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { gettoken } from '../../src/store/AuthSlice';
import {useNavigation} from '@react-navigation/native'
const LOGIN_URL = 'http://192.168.100.18:8000/auth/login/';
 
const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useDispatch()
  const navigation=useNavigation()

  const handleLogin = async () => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log(response)
      

      if (response.status===200) {
        const data = await response.json();
        const token = data.access; // Assuming the token key in the response is 'token'
        dispatch(gettoken(token)) 
        navigation.navigate('Home')
      

        // Navigate to the authenticated part of the app or do something else upon successful login.
      } else {
        // Handle login failure (e.g., show error message)
        Alert.alert('Login failed', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../images/login.png")} />
      <View  style={styles.inputView}>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        style={styles.TextInput}
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        style={styles.TextInput}
      /></View>
     <TouchableOpacity style={styles.loginBtn} onPress={()=>handleLogin()}>
        <Text style={styles.loginText}>Submit</Text>
       
      </TouchableOpacity> 
      <Text style={{fontSize:22,fontWeight:'bold',marginTop:20}}onPress={()=>navigation.navigate('SignUp')}>SignUp</Text>
    </View>
   
);
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
     alignItems:'center',
 

  },
  image: {
    width:'90%',
    height:250,
    marginBottom: 80,
    top:30,
    top:30
   
  },
  selected:{
  margin:20,
  padding:20,
  top:30



  },
  inputView: {
  
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    top:10,
     
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
    
    
  },
  loginText:{
    fontSize:22,
    fontWeight:'bold',
    color:"white"
  }
});