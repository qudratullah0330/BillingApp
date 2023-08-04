import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
const Full_details_data = () => {
  const [data, setData] = useState([]);
  const { token } = useSelector(state => state.auth)
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data)
  const fetchData = () => {
    // Replace 'YOUR_API_URL' with the actual URL of the API you want to fetch data from
    fetch('http://192.168.100.18:8000/main/get_all_bill_details/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',padding:22}}>Data fetched from the API:</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>   <View style={styles.containerData} > 
          <Text style={styles.text_style} >reference_id : {item.reference_id}</Text>
          <Text style={styles.text_style} >User Name: {item.username}</Text>
        <Text style={styles.text_style} >amount : {item. payable}</Text>
        <Text style={styles.text_style} >Date To Pay : {item. payable_date}</Text>
        <Text style={styles.text_style}>Type of Bill : {item.billing_company}</Text>
        <Text style={styles.text_style}> Status : {item.status}</Text>
        
      </View>}
      />
    </View>
  );
};
export default Full_details_data
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
   
    
  },
  containerData:{
  
    padding:20,
    margin:20,
    backgroundColor:'pink',
    borderRadius:20
  }
,text_style:{
  textAlign:'center',
  fontSize:18,
  color:"white"
}
})