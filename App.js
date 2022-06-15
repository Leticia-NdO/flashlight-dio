import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import imageOff from  "./assets/icons/eco-light-off.png"  //'./assets/icons/eco-light-off.png'
import imageOn from './assets/icons/eco-light.png'
import logoDioOff from './assets/icons/logo-dio-white.png'
import logoDioOn from './assets/icons/logo-dio.png'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake'

export default function App() {

  const [toggle, setToggle] = useState(true)


  const handleToggle = () => {
    if (toggle) {
      return setToggle(false)
    }
    return setToggle(true)
  }
  useEffect(() => {
    Torch.switchState(toggle).then(()=>{
      console.log("mudou")
    }).catch((err)=>{
      console.log(err + 1)
    })
  }, [toggle])

  useEffect(()=>{
    const subscription = RNShake.addListener(()=>{
      if (toggle) {
        return setToggle(false)
      }
      return setToggle(true)
    })

    return () => subscription.remove()
  }, [toggle])

  return (

    <View style={toggle ? style.lightContainer : style.darkContainer}>
      <TouchableOpacity onPress={() => {
        handleToggle()
      }}>
        <Image style={toggle ? style.lightingOn : style.lightingOff} source={toggle ? imageOn : imageOff} />

        <Image style={style.dioLogo} source={toggle ? logoDioOn : logoDioOff} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  lightContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  lightingOn: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150
  },
  lightingOff: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150,
    tintColor: "white"
  },
  dioLogo: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 250,
    height: 250
  },
})

