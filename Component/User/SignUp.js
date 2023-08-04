
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {useNavigation} from '@react-navigation/native'

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { DecodeJWTToken } from "../common/DecodeJWTToken";

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [first_name, setfirst_name] = useState('Test1')
  const [last_name, setlast_name] = useState('Test2')

  const { user, isAuth, token } = useSelector(state => state.auth)
  const navigation=useNavigation()
  

  const handleSignUpUser = async () => {

    const url = "http://192.168.100.18:8000/auth/register/"
    let result = await fetch(url, {
      method: 'POST',

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password, password2, first_name, last_name }),
    });
    const response = await result.json()
    console.log(result.status)

  if(result.status === 201){
     navigation.navigate('Login')

  }

  }
  return (
    <View style={styles.container}>

<Image style={styles.image} source={require("../images/signup.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name."
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password2."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password2}
          onChangeText={(password) => setPassword2(password)}
        />
      </View>


      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={() => handleSignUpUser()}>SignUp</Text>

      </TouchableOpacity>



    </View>
  );
}
const styles = StyleSheet.create({
  container: {

    backgroundColor: "#fff",
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 80,
    top: 30,

  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 15,
    alignItems: "center",
    position:'relative',
    bottom:30
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 10,

    fontSize: 22,
    fontWeight: 'bold',
  
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position:'relative',
    bottom:30,

    backgroundColor: "#FF1493",


  },
  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white"
  }
});