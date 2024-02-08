import React, { useState } from 'react'
import { Alert, Image, ImageBackground, StyleSheet, ActivityIndicator, Text, TextInput, View } from 'react-native'
import { auth, db } from "./firebase";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { handleToast } from './ToastHandler';

export default function SignUp({ navigation }) {
    const [firstName, onChangeFirstName] = useState("")
    const [lastName, onChangeLastName] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [spinner, setSpinner] = useState(false)
    const emailPattern = /^[\w.-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/i;
    
    

    const handleClick = async () => {
        try {
            if (firstName === "") {
                Alert.alert("Please enter valid name")
            }
            else if (lastName === "") {
                Alert.alert("Please enter valid last name.")
            }
            else if (!emailPattern.test(email)) {
                Alert.alert("Please ebter valid email")
            }
            else if (password.length < 6) {
                Alert.alert("Please enter valid password")
            }
            else {
                setSpinner(true)
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, "Users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                })
                handleToast("Account created successfully!")
                setSpinner(false)



                navigation.navigate('Login')

            }
        }
        catch (error) {
            handleToast(error.message)
        }

    }
    return (

        <ImageBackground style={styles.welcomeImage} source={require('./Images/LogoDesign.jpg')}>
            <Image style={styles.ImageLogo} source={require("./Images/ExpenseLogo.png")} ></Image>
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>FirstName</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeFirstName}
                    value={firstName}
                />

                <Text style={styles.signUpText}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLastName}
                    value={lastName}
                />
                <Text style={styles.signUpText}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                />
                <Text style={styles.signUpText}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                />
                <View style={styles.signUpButton}>
                    <View style={styles.signUpButtons}><Text style={styles.signUpInfo} onPress={async () => handleClick()}>Sign Up
                        {
                            spinner ? (
                                <>
                                    <ActivityIndicator size="small" color="#0000ff" />
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </Text></View>
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
        top: 110
    },
    signUpText: {
        color: "white"
    },
    signUpInfo: {
        fontSize: 20,

        alignItems: "center",
        textAlign: "center",
        marginTop: 6,
        color: "black"
    },
    signUpButton: {
        justifyContent: "center",
        alignItems: "center",
    }
})

