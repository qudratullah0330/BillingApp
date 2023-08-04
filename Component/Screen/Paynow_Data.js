import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useSelector } from 'react-redux';

const Paynow_Data = ({ route }) => {
  const { data, reference_id } = route.params;

  const token = useSelector((state) => state.auth.token);

  const handleSearch = async () => {
    try {
      console.log(reference_id)
      let response = await axios.put(
        'http://192.168.100.18:8000/main/pay_now/',
        {
          reference_id: reference_id, // Pass the reference_id directly as a number
        },

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // If your API requires authentication, pass the token in the header
          },
          body: JSON.stringify({ reference_id }),

        }

      );
      if (response) {
        alert('Your Payment SuccessFully Added')
      }
    } catch (error) {
      console.error('Error saving reference ID:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.container} >
            <Text style={styles.text_style} >reference_id: {item.reference_id}</Text>
            <Text style={styles.text_style}>Bill Type: {item.billing_company}</Text>
            <Text style={styles.text_style}>User Name: {item.username}</Text>
            <Text style={styles.text_style}>Payment: {item.payable}</Text>
            <Text style={styles.text_style}>Status: {item.status}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => handleSearch()}>
        <Text style={styles.loginText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Paynow_Data;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  text_style: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    margin: 10,
    top: 30
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
   
    backgroundColor: "#FF1493",
    position: 'relative',
    bottom: 60,
  },
  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white"
  }
});
