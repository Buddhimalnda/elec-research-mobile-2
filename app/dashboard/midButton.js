import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import {_COLORS} from '../../style'
import Slider from '@react-native-community/slider';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ColorPicker from '../colorPicker';
const MidButton = () => {
  const navigation = useNavigation();
  
const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <Pressable style={[styles.sideBtn, styles.shadowBox]} onPress={()=> navigation.navigate("EditButtonList")}>
          <AntDesign name="edit" size={30} color="white" />
        </Pressable>
        <Pressable style={[styles.sideBtn, styles.shadowBox]} onPress={()=> alert("Saving current Details")}>
          <AntDesign name="save" size={30} color="white" />
        </Pressable>
      </View>
      <View style={styles.midBar}>
      
        <Pressable style={[styles.midBtn, styles.shadowBox]}>
        <AntDesign name="poweroff" size={100} color="white" />
        </Pressable>
      </View>
      <View style={styles.sliderBar}>
        <Text style={styles.test}>Brightness</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={255}
          minimumTrackTintColor={_COLORS.primary}
          maximumTrackTintColor="#000000"
          // onValueChange={(value) => console.log(value)}
        />
      </View>
      <View style={styles.sideBar}>
        <Pressable style={[styles.sideBtn, styles.shadowBox]} onPress={()=> navigation.navigate("ColorPicker")}>
          <Ionicons name="speedometer-outline" size={24} color="white" />
        </Pressable>
        <Pressable style={[styles.sideBtn, styles.shadowBox]}  onPress={()=> alert("Reset to Default")}>
          <AntDesign name="retweet" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

export default MidButton

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    sliderBar:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    sideBar:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%"
    },
    sideBtn: {
        backgroundColor: _COLORS.primary,
        color: '#fff',
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    midBar:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    midBtn: {   
        backgroundColor: _COLORS.primary,
        color: '#fff',
        width: 180,
        height: 180,
        borderRadius: 100,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadowBox:{
      shadowColor: _COLORS.dark,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity:  0.17,
      shadowRadius: .5,
      elevation: 5
    }
})