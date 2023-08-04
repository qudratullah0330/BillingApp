import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Dropdown from 'react-native-input-select';
import { useSelector } from "react-redux";
import { DecodeJWTToken } from "../common/DecodeJWTToken";
LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb.', 'Mar', 'Apr', 'May', 'June', 'July.', 'Aug', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: "Today"
};


export default function schedule() {
  const [selected, setSelected] = useState('');
  const [reference_id, setRefer] = useState('');
  const [selectedValue, setSelectedValue] = useState('1');
  const navigation = useNavigation()
  const { token } = useSelector(state => state.auth)
  const route = useRoute();
  const { amount } = route.params


  const handleSignUpUser = async () => {
    const decodeToken = DecodeJWTToken(token)
    const url = "http://192.168.100.18:8000/main/schedule_bill/"
    try {
      if (amount === 0 || reference_id !== "" || selected !== "") {
        let result = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            user: decodeToken.user_id,
            reference_id,
            payable_date: selected,
            payable: amount,
            bill_pay_to: selectedValue,
            bill_status: 2,
          }),
        });
        const response = await result.json()

        if (result.status === 201) {
          alert('Your All Date is Successfully Added')
          navigation.navigate('Full_details_data')
        }
      } else {
        alert("Amount or referece id not found")
      }

    } catch (error) {
      alert('Internet not found')
    }
  }
  LocaleConfig.defaultLocale = 'fr';
  return (
    <View style={styles.container}>

      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
        }}
      />

      <View style={{ top: 20}}>
        <Dropdown
      

          options={[
            { label: 'Oil', value: 1 },
            { label: 'Electricity', value: 2 },
            { label: 'Water', value: 3 },
            { label: 'gass', value: 4 },

          ]}
          style={{backgroundColor: 'red',
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
          marginTop: 20,
 }}
         
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          primaryColor={'green'}
        />
      </View>


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Reference number"
          placeholderTextColor="#003f5c"
          value={reference_id}
          onChangeText={(e) => setRefer(e)}
        />
      </View>

      <View style={{ top: 20}}>
        <Dropdown
      

          options={[
            { label:'easy Paisa', value: 1 },
            { label: 'Jazz Cash', value: 2 },
            { label: 'Paypal', value: 3 },
            { label: 'HBL', value: 4 },

          ]}
          placeholder="Select Payment Method"
          style={{backgroundColor: 'red',
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
          marginTop: 20,
 }}
         
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          primaryColor={'green'}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleSignUpUser()}>
        <Text style={styles.loginText}>Add Now</Text>

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
    top: 20
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
   position:'relative',
   bottom:30,

  },
  loginText: {
    fontSize: 22,
    fontWeight: 'bold',

  }
});