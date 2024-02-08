import React from 'react'
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import SignUp from './SignUp';
// import SignUp from './SignUp';
export default function Welcome({navigation}) {
  return (
    
      <ImageBackground style={styles.welcomeImage} source={require('./Images/LogoDesign.jpg')}>
        <Image style={styles.ImageLogo}source={require("./Images/ExpenseLogo.png")} ></Image>
        <View style={styles.loginButtons}><Text style={styles.loginInfo } onPress={()=>navigation.navigate('Login')}>Log In</Text></View>
        <View style={styles.signUpButtons}><Text style={styles.signUpInfo} onPress={()=>navigation.navigate('SignUp')}>Sign Up</Text></View>
        <SafeAreaView title="Test"></SafeAreaView>
      </ImageBackground>

    
  )
}
const styles = StyleSheet.create({
  welcomeImage: {
    flex: 1,
    justifyContent:"flex-end"
  },
  loginButtons: {
    width:"100%",
    height:60,
    backgroundColor:"#72B8EC"
  },
  signUpButtons: {
    width:"100%",
    height:60,
    backgroundColor:"#480F0C"
  },
  headerContainer:{
    color: "red",
    position:"relative",
    alignItems: "center",

  },
  ImageLogo: {
    height:240,
    width:240,
    top:110,
    left:90,
    position: "absolute"
  },
  loginInfo: {
    fontSize:20,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    marginTop:15,

  },
  signUpInfo: {
    fontSize:20,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    marginTop:15,
    color:"#fff"
  }
})
