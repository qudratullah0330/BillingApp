import { useRoute } from "@react-navigation/native";
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
import SelectDropdown from 'react-native-select-dropdown'
const countries = ["gass", "electrical", "TV", "Internet"]
export default function App({ navigation }) {
  const [name, setName] = useState('')
  const [TotalAmount, setTotalAmount] = useState('')
  const route = useRoute();
  const { amount } = route.params

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../images/Money-Transparent-Image.png")} />

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('PayNow')}>
        <Text style={styles.loginText}>Pay Now</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('schedule', { amount })}>
        <Text style={styles.loginText}>schedule</Text>

      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',


  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 80,
    top: 30,
    top: 50

  },
  selected: {
    margin: 20,
    padding: 20,
    top: 30



  },
  inputView: {

    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    top: 50
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
  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white"
  }
});