
import React, { useState, useEffect } from 'react'
import { Alert, Image, ImageBackground, StyleSheet, ActivityIndicator, Text, TextInput, View } from 'react-native'
import { auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Footer from './Footer'
import HeaderBar from './HeaderBar'
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import { handleToast } from './ToastHandler';

export default function AddExpense() {
  const [expenseName, onChangeExpenseName] = useState("")
  const [price, onChangePrice] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [category, setCategory] = useState('Select Category');
  const [savedCategory, setSavedCategory] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState("")
  const handleCategoryChange = (itemValue) => {
    setCategory(itemValue);
    setPickerVisible(false); // Close the Picker after selecting an item
  };

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

  const handleSaveCategory = () => {
    setSavedCategory(category);
  };

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
      if (expenseName === "") {
        Alert.alert("Please enter valid Expense name")
      }
      else if (category === "Select Category") {
        Alert.alert("Please select valid category")
      }
      else if (price === "") {
        Alert.alert("Please enter valid price")
      }

      else {
        try {
          setSpinner(true)
          await setDoc(doc(db, currentUser.uid, getCurrentTimeAsNumber()), {
            expenseName: expenseName,
            category: category,
            price: Number(price),
            date: serverTimestamp(),
          })
            setSpinner(false)
            await handleToast("Expense added successfully");
            onChangeExpenseName("")
            onChangePrice("")
            setCategory('Select Category')
          
        }
        catch(error) {
          handleToast("Error adding expense. Please try again.");
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
      
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Expense Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeExpenseName}
          value={expenseName}
        />

        <View style={styles.categoryContainer}>
          <Text style={styles.signUpText}>Category</Text>
          <TouchableOpacity
            onPress={() => setPickerVisible(true)} // Show the Picker on press
            style={styles.categoryPickerContainer}
          >
            <Text style={styles.picker}>{category}</Text>
          </TouchableOpacity>
          {pickerVisible && ( // Render Picker only when pickerVisible is true
            <Picker
              selectedValue={category}
              onValueChange={handleCategoryChange}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Category" value="Select Category" color="white" />
              <Picker.Item label="Food" value="Food" color="white" />
              <Picker.Item label="Grocery" value="Grocery" color="white" />
              <Picker.Item label="Bills" value="Bills" color="white" />
              <Picker.Item label="Outdoor Expenses" value="Outdoor Expenses" color="white" />
              <Picker.Item label="Shopping" value="Shopping" color="white" />
              <Picker.Item label="Remitance" value="Remitance" color="white" />
              <Picker.Item label="Gas" value="Gas" color="white" />
              <Picker.Item label="Car-Maintenance" value="Car-Maintenance" color="white" />
              <Picker.Item label="Rent" value="Rent" color="white" />
              <Picker.Item label="Interest Charged" value="Interest Charged" color="white" />
              <Picker.Item label="Ride" value="Ride" color="white" />
              <Picker.Item label="Others" value="Others" color="white" />
            </Picker>
          )}
          <TouchableOpacity onPress={handleSaveCategory} style={styles.button}>
            <Text style={styles.buttonText}>Save Category</Text>
          </TouchableOpacity>
          <Text style={styles.savedCategoryText}>Saved Category: {savedCategory}</Text>
        </View>
        <Text style={styles.signUpText}>Price</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrice}
          value={price}
        />


        <View style={styles.signUpButton}>
          <View style={styles.signUpButtons}><Text style={styles.signUpInfo} onPress={async () => handleClick()}>Add Expense
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
    bottom: -295
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
