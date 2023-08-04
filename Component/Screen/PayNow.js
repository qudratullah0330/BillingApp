// ReferenceNumberInputScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import { useSelector } from 'react-redux';
const PayNow = ({ navigation }) => {
  const [reference_id, setReferenceNumber] = useState("");

  const token = useSelector((state) => state.auth.token);
  const handleSearch = () => {
    // Replace 'YOUR_DJANGO_API_URL' with the actual URL of your Django API endpoint
    axios
      .get(`http://192.168.100.18:8000/main/get_bill_details/?reference_id=${reference_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace YOUR_AUTHENTICATION_TOKEN with the actual token
        },
      })
      .then((response) => {
        // Check if the response is valid and has a 'data' property
        if (response && response.data) {
          const matchedData = response.data; // Assuming the API returns an array of matched data
          navigation.navigate("Paynow_Data", { data: matchedData, reference_id });
        } else {
          console.error("Error fetching data: Invalid response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  return (

    <View style={styles.container} >
      <View style={styles.inputView}><TextInput
        placeholder="Enter Reference Number"
        value={reference_id}
        onChangeText={setReferenceNumber}
        style={styles.TextInput}
      /></View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSearch}>
        <Text style={styles.loginText} >Pay Now</Text>

      </TouchableOpacity>
    </View>
  );
};

export default PayNow;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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