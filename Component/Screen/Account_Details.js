import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
export default function App({navigation}) {
    const [Data,setData]=useState([])
    const Add_Amount = async () => {
      const url = "http://192.168.100.18:8000/main/add_amount/";
      const token = "YOUR_AUTHENTICATION_TOKEN"; // Replace this with your actual authentication token
    
      let result = await fetch(url, {
        method: 'GET', // Use 'GET' method since you are retrieving data
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
    

        useEffect(()=>{
            Add_Amount();
        },[])
  return (
    <View style={styles.container}>

      <ScrollView>
        {Data.length?
        Data.map((item)=>
      <View style={{margin:20,padding:20,elevation:15,width:300,height:200,backgroundColor:'white',borderRadius:30}}>
        
        <Text style={{margin:10,fontSize:18,textAlign:'center'}}>TotalAmount: {item.amount}</Text>
      </View>):null}
    
      </ScrollView>
      <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Home')}>
        <Text style={styles.loginText} >Go Back</Text>
       
      </TouchableOpacity>
   
      
      
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
     alignItems:'center',

  },
  image: {
    width:'100%',
    height:250,
    marginBottom: 80,
    top:30,

   
  },
  

  loginBtn: {
    position:'absolute',
    bottom:50,
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