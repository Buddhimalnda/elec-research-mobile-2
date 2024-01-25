import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { _COLORS } from '../../style'
{/* battery charging level 
        props:{
            batteryChargLevel: 0
            lastUpdate: date & time
        }
*/}

const BatteryChargLevel = ({props}) => {
  return (
    <View style={styles.card} >
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleText}>Battery Charging Level</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardBodyPart}>
          <Text style={styles.cardBodyTextLg}>Last Update: </Text>
          <Text style={[styles.cardBodyTextSm ]}>07 jan 2024 01:05:00</Text>
        </View>
        <View style={styles.cardBodyPart}>
          <Text style={[styles.cardBodyTextLgs]}>75%</Text>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        marginTop: 10,
        marginHorizontal: 5,
        height: 120,
        borderRadius: 10,
        backgroundColor: _COLORS.quaternary,
        // borderColor: '#000',
        // borderWidth: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 5,
        shadowColor: _COLORS.glassDark,
        shadowOffset: {
          width: 3,
          height: 5,
        },
        shadowOpacity:  0.17,
        shadowRadius: 0.5,
        elevation: 1
    },
    cardTitle:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardTitleText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: _COLORS.white,
        marginLeft: 15,
        marginTop: 10,
    },
    cardBody:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 10,
    },
    cardBodyTextLg:{
        fontSize: 20,
        fontWeight: 'bold',
        color: _COLORS.gray
    },
    cardBodyTextLgs:{
        fontSize: 40,
        fontWeight: 'bold',
        color: _COLORS.primary,
        marginTop: -15,
    },
    cardBodyTextSm:{
        fontSize: 15,
        fontWeight: 'bold',
        color: _COLORS.lightGray
    },

})

export default BatteryChargLevel
