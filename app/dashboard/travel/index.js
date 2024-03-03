import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Today from "./Today";
import StepTime from "./time";
import { _COLORS } from "../../../style";
import CountryWiseAnalysis from "./chart";
import {
  calorieBurn,
  getStepCount,
  getStepList,
  stepList,
} from "../../../db/stepCount";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../config/firebase";

function Travel() {
  const [steps, setSteps] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [calorieBurned, setCalorieBurned] = useState(0);
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
      getStepCount({
        user_id: "HYWBRRXdwtN7TseWcR5AKpybrqW2",
        date: "2024-02-21",
      })
        .then((res) => {
          setSteps(res);
          setIsLoaded(true);
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
      setCalorieBurned(
        calorieBurn({ met: 3.8, weight: 60, duration: (steps * 10) / 3600 })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [getStepCount]);
  if (isLoaded) {
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
        <StepTime
          calories={calorieBurned}
          distance={100}
          time_duration={"01:10:00"}
        />
        {/* <CountryWiseAnalysis /> */}
      </ScrollView>
    );
  }
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default Travel;

const styles = StyleSheet.create({});
