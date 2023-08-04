import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useSelector } from 'react-redux';
import { DecodeJWTToken } from "../common/DecodeJWTToken";
import { useRoute } from "@react-navigation/native";
export default function Home({ navigation }) {
  const [Data, setData] = useState([])
  const route = useRoute()
  const amount  = route.params?.amount;
  const token = useSelector((state) => state.auth.token);

  const Add_Amount = async () => {

    const url = "http://192.168.100.18:8000/main/add_amount/";
    // Replace this with your actual authentication token
    let result = await fetch(url, {
      method: 'Get', // Use 'GET' method since you are retrieving data
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      },
    });

    if (result.ok) {
      const data = await result.json();
      console.log(data);
      setData(data);
    } else {
      console.log("Error:", result.status);
      // Handle the error here, e.g., redirect to login page or show an error message
    }
  };


  useEffect(() => {
    Add_Amount();
  }, [])
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../images/Money-Transparent-Image.png")} />
      <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
        <View ><Text>Your Payment</Text>

          <ScrollView>
            {Data.length ?
              Data.map((item) =>
                <View>

                  <Text style={{ margin: 10, fontSize: 18, textAlign: 'center' }}>{item.amount}</Text>
                </View>) : null}

          </ScrollView></View>
        <TouchableOpacity style={styles.Btn_add_payment} onPress={() => navigation.navigate('Add_Amount')}>
          <Text style={styles.loginText}>Add</Text>

        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Bill', { amount: amount !== undefined ? amount : 0 })} >
        <Text style={styles.loginText} >Pay Bill</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Full_details_data')}>
        <Text style={styles.loginText}>List Details</Text>

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

  },


  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#FF1493",
    position:'relative',
    bottom:60

  },
  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white"
  },
  Btn_add_payment: {
    width: "30%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    left: 30,
    backgroundColor: "#FF1493",

  }
});