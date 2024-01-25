import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BatteryChargLevel from './batteryChargLevel'
import MidButton from './midButton'
import FooterButton from './footerButton'
import { _COLORS } from '../../style'
import Workout from './workout'
import { connect, useSelector  } from 'react-redux';
const Home = ({auth}) => {

  const a = useSelector((state) => state.auth.user);
  console.log(a);
  return (
    <ScrollView style={styles.container}>
      {/* battery charging level */}
      <BatteryChargLevel />
      {/* Workout */}
      <Workout />
      {/* Device on/off switch */}
      <MidButton />
      {/* patton creating btns */}
      <FooterButton /> 
    </ScrollView>
  )
}

export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _COLORS.white,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // positionr: 'relative',
    },
})