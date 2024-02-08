import React, { useState } from 'react'
import { ImageBackground, Text, View,StyleSheet, Image, TextInput } from 'react-native'

export default function Login() {
    const [firstName, onChangeFirstName] = useState("")
    const [lastName, onChangeLastName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [cPassword, onChangeCPassword] = useState("")
    return (

        <ImageBackground  style={styles.welcomeImage} source={require('./Images/LogoDesign.jpg')}>
            <Image style={styles.ImageLogo} source={require("./Images/ExpenseLogo.png")} ></Image>
            <View style={styles.signUpContainer}>
               
                <Text style={styles.signUpText}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeFirstName}
                    value={firstName}
                />
                <Text style={styles.signUpText}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeFirstName}
                    value={firstName}
                />
                <View style={styles.signUpButton}>
                <View style={styles.signUpButtons}><Text style={styles.signUpInfo}>Login</Text></View>
                </View>
                 
            </View>

        </ImageBackground>

    )
}
const styles = StyleSheet.create({
    welcomeImage: {
        flex: 1,
    },
    loginButtons: {
        width: "100%",
        height: 60,
        backgroundColor: "#72B8EC"
    },
    signUpButtons: {
        width: "30%",
        height: 40,
        backgroundColor: "#CD8C28",
        borderRadius: 20
    },
    headerContainer: {
        color: "red",
        position: "relative",
        alignItems: "center",

    },
    ImageLogo: {
        height: 120,
        width: 120,
        top: 10,
        left: 145,
        position: "absolute"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "white",
        position: "relative",
        fontSize: 13,
        borderColor: "white"
    },
    signUpContainer: {
        top:110
    },
    signUpText: {
        color:"white"
    },
    signUpInfo: {
        fontSize:20,
        
        alignItems: "center",
        textAlign: "center",
        marginTop:6,
        color:"black"
      },
      signUpButton: {
        justifyContent: "center",
        alignItems: "center",
      }
})
