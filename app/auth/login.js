import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Svg, { Image, ClipPath, Ellipse } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import styles from "./styles";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const { height, width } = Dimensions.get("window");
function Login({ navigation }) {
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const formTyping = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [fname, setFname] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
      backgroundColor:
        formTyping.value === 1
          ? withTiming("white", { duration: 800 })
          : withTiming("", { duration: 300 }),
      // height: formTyping.value === 1 ? withTiming(300, { duration: 800 }) : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };
  const isLogin = () => {
    
  };

  
  const signIn = async () => {
    setLoading(true)
    console.log('====================================');
    console.log(email, password);
    console.log('====================================');
    try {
        const res = await signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            alert("User found")
            setLoading(false)
        })
          alert("User found")
          setLoading(false)
          navigation.navigate("Dashboard")
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert("User not found")
        setLoading(false)
    }
    finally{
        setLoading(false)
    }
}

const signUp = async () => {
    setLoading(true)
    try {
        const res = await createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            alert("User found")
            
            setDoc(doc(FIREBASE_DB, "users", userCredential.user.uid), {
              fullName: fname
            }).then(() => {
              console.log("Document successfully written!");
            });
            setLoading(false)
        })
          setLoading(false)
          navigation.navigate("Dashboard")
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert("User not found")
        setLoading(false)
    }
    finally{
        setLoading(false)
    }
}

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={[StyleSheet.absoluteFill, imageAnimatedStyle, styles.image]}
      >
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={require("../../assets/img1.jpg")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}
        >
          <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            onTextInput={() => (formTyping.value = 1)}
            onChangeText={(e)=> setEmail(e)}
          />
          {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
              onChangeText={(e)=> setFname(e)}
            />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(e)=> setPassword(e)}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable
              onPress={() => {
                formButtonScale.value = withSequence(
                  withSpring(1.5),
                  withSpring(1)
                );
                isRegistering? signUp() :signIn();
              }}
            >
              <Text style={styles.buttonText}>
                {isRegistering ? "REGISTER" : "LOG IN"}
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

export default Login;
