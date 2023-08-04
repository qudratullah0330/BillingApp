import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import StackNavigation from "./Component/User/StackNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  )
}