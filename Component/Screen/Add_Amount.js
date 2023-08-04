
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { DecodeJWTToken } from "../common/DecodeJWTToken";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export default function App({ navigation }) {

  const [amount, setEnterAmount] = useState('')
  const token = useSelector((state) => state.auth.token);



  const handleAddAmount = async () => {

    const Dtoken = DecodeJWTToken(token)
    let id = Dtoken.user_id
    console.log(id)
    console.log(Dtoken)
    const url = "http://192.168.100.18:8000/main/add_amount/"
    try {
      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ amount, user: id }),
      });
      const response = await result.json()
      console.log(response)
      if (response) {
        alert('Your Payment is successfully added')
        navigation.navigate('Home', { amount })
      }
    } catch (error) {
      console.log(error || 'something went wrong')
    }




  }
  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require("../images/Money-Transparent-Image.png")} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Total Amount"
          placeholderTextColor="#003f5c"

          value={amount}
          onChangeText={(password) => setEnterAmount(password)}
        />

      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={() => handleAddAmount()}>Enter Amount</Text>

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
    width: "100%",
    height: 250,
    marginBottom: 80,
    top: 30,

  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
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
    top: 50,
    fontSize: 22,
    fontWeight: 'bold'

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
  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white"
  }
});