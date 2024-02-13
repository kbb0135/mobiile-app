
import React, { useState, useEffect } from 'react'
import { Alert, Image, ImageBackground, StyleSheet, ActivityIndicator, Text, TextInput, View } from 'react-native'
import { auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Footer from './Footer'
import HeaderBar from './HeaderBar'
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import { handleToast } from './ToastHandler';

export default function AddSaving() {
  const [savingName, onChangeSavingName] = useState("")
  const [price, onChangePrice] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [category, setCategory] = useState('Select Category');
  const [currentUser, setCurrentUser] = useState("")


  useEffect(() => {
    // Firebase Auth listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);




      } else {
        // User is signed out.
        setCurrentUser(null);
      }

    }, []);

    // Cleanup function
    return () => unsubscribe();
  }, []);


  const handleClick = async () => {
    const getCurrentTimeAsNumber = () => {
      const currentTime = new Date();

      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const seconds = currentTime.getSeconds().toString().padStart(2, '0');
      const date = currentTime.getDate().toString().padStart(2, '0');
      const month = (currentTime.getMonth() + 1).toString().padStart(2,'0')
      const year = currentTime.getFullYear().toString()

      const formattedTime = `${year}${month}${date}${hours}${minutes}${seconds}`;
      return formattedTime;
    };
    try {
      if (savingName === "") {
        Alert.alert("Please enter valid Expense name")
      }
      else if (price === "") {
        Alert.alert("Please enter valid price")
      }
      else {
        try {
          setSpinner(true)
          const userSaving=`${"s"}${currentUser.uid}`
          await setDoc(doc(db, userSaving, getCurrentTimeAsNumber()), {
            savingeName: savingName,
            price: Number(price),
            date: serverTimestamp(),
          })
            setSpinner(false)
            await handleToast("Saving added successfully");
            onChangeSavingName("")
            onChangePrice("")
          
            
          
        }
        
        catch(error) {
          handleToast("Error adding saving. Please try again.");
          setSpinner(false);
        }


      }
    }
    catch (error) {
      handleToast(error.message)
    }

  }
  return (
    <ImageBackground style={styles.welcomeImage} source={require('./Images/LogoDesign.jpg')}>
      <HeaderBar />
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Saving Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSavingName}
          value={savingName}
        />

        <Text style={styles.signUpText}>Price</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrice}
          value={price}
        />


        <View style={styles.signUpButton}>
          <View style={styles.signUpButtons}><Text style={styles.signUpInfo} onPress={async () => handleClick()}>Add Saving
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

      </View >
      <View style={styles.footerWrap}>
        <Footer />
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
    width: "50%",
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
  },
  footerWrap: {
    bottom: -470
  },
  categoryContainer: {
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Set text color to white
    marginBottom: 5,
  },
  categoryPickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    color: "white",
    backgroundColor: "black" // Set picker text color to white
  },
  pickerItem: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white', // Set button text color to white
    fontSize: 16,
  },
  savedCategoryText: {
    fontSize: 16,
    color: 'white', // Set saved category text color to white
  },

})
