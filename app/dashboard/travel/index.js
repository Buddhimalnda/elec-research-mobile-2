import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Today from "./Today";
import StepTime from "./time";
import { _COLORS } from "../../../style";
import CountryWiseAnalysis from "./chart";
import { getStepCount } from "../../../db/workout";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../config/firebase";

function Travel() {
  const [steps, setSteps] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
        //log
        console.log("User: ", user.uid);
      }
    });
  }, [onAuthStateChanged]);
  useEffect(() => {
    const interval = setInterval(() => {
      getStepCount({ user_id: user?.uid, date: "2024-02-21" })
        .then((res) => {
          setSteps(res);
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [setSteps, getStepCount]);

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: _COLORS.black,
            marginRight: 5,
          }}
        >
          Today's Special
        </Text>
      </View>
      <Today steps={steps} />
      <StepTime calories={100} distance={100} time_duration={"01:10:00"} />
      <CountryWiseAnalysis />
    </ScrollView>
  );
}

export default Travel;

const styles = StyleSheet.create({});
