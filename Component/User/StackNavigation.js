import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'
import SignUp from './SignUp'
import Home from "../Screen/Home"
import Account_Details from "../Screen/Account_Details"
import Add_Amount from "../Screen/Add_Amount"
import Bill from "../Screen/Bill"

import schedule from "../Screen/schedule"
import Full_details_data from '../Screen/Full_details_data'
import { useSelector } from 'react-redux';
import PayNow from '../Screen/PayNow';
import Paynow_Data from '../Screen/Paynow_Data';


const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  const { isAuth,token } = useSelector(state => state.auth)
  console.log(token)
  return (
    <Stack.Navigator initialRouteName={isAuth ? 'Home' : "Login"}>
      {!isAuth && <Stack.Screen name='SignUp' component={SignUp} />}
      {!isAuth && <Stack.Screen name="Login" component={Login} />}
      
      {isAuth && <Stack.Screen name='Home' component={Home} />}
      {isAuth && <Stack.Screen name='Account_Details' component={Account_Details} />}
      {isAuth && <Stack.Screen name='Add_Amount' component={Add_Amount} />}
     
      {isAuth && <Stack.Screen name='Bill' component={Bill} />}
      {isAuth && <Stack.Screen name='schedule' component={schedule} />}
      {isAuth && <Stack.Screen name='Full_details_data' component={Full_details_data} />}
      {isAuth && <Stack.Screen name='PayNow' component={PayNow} />}   
      {isAuth && <Stack.Screen name='Paynow_Data' component={Paynow_Data} />}
    

    </Stack.Navigator>
  )
}
