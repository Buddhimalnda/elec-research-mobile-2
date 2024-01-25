import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { _COLORS } from '../../../style'
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Edit() {
    const [fName, setFName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [user, setUser] = useState();
    const [userData, setUserData] = useState({});

    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [bodyComposition, setBodyComposition] = useState('')


    const navigation = useNavigation();

    useEffect(() => {
        //get user from firebase
        onAuthStateChanged(FIREBASE_AUTH, (snap) => {
          setUser(snap);
          console.log('====================================');
          console.log("User: ", snap);
            setUserData(getUserData(snap?.uid));
            setAddress(userData?.address)
            setFName(userData?.fullName)
            setPhone(userData?.phone)
            setWeight(userData?.weight)
            setHeight(userData?.height)
            setDob(userData?.dob)
            setGender(userData?.gender)
            setBodyComposition(userData?.bodyComposition)
          console.log('====================================');
        });
    }, [FIREBASE_AUTH, getUserData]);

    const getUserData =async (id) => {
        const docRef = await doc(FIREBASE_DB, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserData(docSnap.data());
          return docSnap.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return null;
        }
    }

    const save =async () => {
        const ref = doc(FIREBASE_DB, "users", user?.uid);
        // Set the "capital" field of the city 'DC'
        await updateDoc(ref, {
            fullName: fName,
            address: address,
            phone: phone,
            weight: weight,
            height: height,
            dob: dob,
            gender: gender,
            bodyComposition: bodyComposition,
        }).then(() => {
            console.log("Document successfully updated!");
            navigation.navigate("Profile")
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });


    }


  return (
    <ScrollView>
      
    <View style={styles.container}>
      <View style={styles.input}>
        <Text>Full Name</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setFName(e)}
            value={fName}
            placeholder="Full Name"
            keyboardType="default"
        />
      </View>
      <View style={styles.input}>
        <Text>Address</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setAddress(e)}
            value={address}
            placeholder="Address"
            keyboardType="default"
        />
      </View>
      <View style={styles.input}>
        <Text>Phone Number</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setPhone(e)}
            value={phone}
            placeholder="Phone Number"
            keyboardType="default"
        />
      </View>
      <View style={styles.input}>
        <Text>Weight</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setWeight(e)}
            value={phone}
            placeholder="Weight"
            keyboardType="default"
        />
      </View>
      <View style={styles.input}>
        <Text>Height</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setHeight(e)}
            value={phone}
            placeholder="Height"
            keyboardType="default"
        />
      </View>
      <View style={styles.input}>
        <Text>DOB</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setDob(e)}
            value={phone}
            placeholder="DOB"
            keyboardType="default"
        />
      </View>
      <View style={styles.input}>
        <Text>Gender</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setGender(e)}
            value={phone}
            placeholder="Gender"
            keyboardType="default"
        />
      </View>
      <View style={styles.input}>
        <Text>Body Composition</Text>
        <TextInput
            style={styles.inputBox}
            onChangeText={(e)=> setBodyComposition(e)}
            value={phone}
            placeholder="Gender"
            keyboardType="default"
        />
      </View>

      <Button title="Save" color={_COLORS.primary} onPress={save}  />
    </View>
    
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input:{
        padding: 10,
        borderRadius: 5
    },
    inputBox:{
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
    }
})

export default  Edit