import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Today from './Today'
import StepTime from './time'
import { _COLORS } from '../../../style'
import CountryWiseAnalysis from './chart'

function Travel  () {
  return (
    <ScrollView>
      <View style={{justifyContent: 'center', alignItems: "center", marginVertical: 5}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: _COLORS.black, marginRight:5}}>Today's Special</Text>
      </View>
      <Today steps={2000} />
      <StepTime calories={100} distance={100} time_duration={"01:10:00"}/>
      <CountryWiseAnalysis />
    </ScrollView>
  )
}

export default Travel

const styles = StyleSheet.create({})