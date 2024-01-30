import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FIREBASE_AUTH } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Edit from './app/dashboard/profile/edit';
import Profile from './app/dashboard/profile';
import AppStack from './app/index';
import ColorPicker from './app/colorPicker';
import EditBtnList from './app/edit';
import store from './store';
import { login } from './store/auth';
import BleComponent from './app/bluetooth/scanDevice';
import { useBluetoothData } from './lib/Bluetooth';
import Bluetooth from './app/bluetooth/scanDevice';


export default function App() {
  
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //     onAuthStateChanged(FIREBASE_AUTH, (snap) => {
  //       setUser(snap);
  //       console.log('====================================');
  //       console.log("User: ", snap);
  //       console.log('====================================');
  //     });
  // }, [FIREBASE_AUTH])

  
  return (
    <Provider store={store}>
      <AppRaw user={user} />
      {/* <BleComponent /> */}
    </Provider>
  );
}


const AppRaw = ({user}) => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ !user? "Dashboard" :"Login"}>
      {/* <Stack.Navigator initialRouteName={"EditProfile"}> */}
      <Stack.Screen name="Login" options={{
        header: () => null,
      }} component={login} />
      <Stack.Screen
        name="Dashboard"
        options={{
          header: () => null,
        }}
        component={AppStack}
      />
      <Stack.Screen
        name="ColorPicker"
        navigationKey='ColorPicker'
        component={ColorPicker}
      />
      <Stack.Screen
        name="EditButtonList"
        navigationKey='ColorPicker'
        component={EditBtnList}
      />
      <Stack.Screen
        name="EditProfile"
        navigationKey='EditProfile'
        component={Edit}
      />
      <Stack.Screen
        name="Profile"
        navigationKey='Profile'
        component={Profile}
      />
      <Stack.Screen
        name="Bluetooth"
        navigationKey='Bluetooth'
        component={Bluetooth}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
