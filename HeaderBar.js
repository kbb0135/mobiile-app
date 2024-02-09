import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from './firebase'
import { Feather, navicon } from 'react-native-vector-icons';
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { handleToast } from './ToastHandler';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBar({ }) {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState("")
  const [showOptions, setShowOptions] = useState(false);
  const [firstName, setFirstName] = useState("")

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const getUserName = async () => {
    const docRef = doc(db, "Users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFirstName(docSnap.data().firstName)
      console.log("Document data:", docSnap.data().firstName);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const options = [
    { id: '1', title: 'Profile', icon: 'user' },
    { id: '2', title: 'Settings', icon: 'settings' },
    { id: '3', title: 'Logout', icon: 'log-out' }
  ];
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

  useEffect(() => {
    if (currentUser && currentUser.uid) {
        getUserName();
    }
}, [currentUser]);

const handleLogout = async() => {
  signOut(auth).then(()=> {
    handleToast("User is successfully signed out");
    navigation.navigate("Welcome")

  })
}
  return (
    <View style={styles.container}>
      <Text style={styles.username}>EXPENSE APP</Text>
      <TouchableOpacity style={styles.downArrow} onPress={toggleOptions}>
        <Text style={styles.headerText}>Welcome {firstName}</Text>
        <Feather name="menu" size={24} color="white" />
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map(item => (
            <TouchableOpacity 
            key={item.id} 
            style={styles.optionItem}
            onPress={()=> {
              if(item.id === '3') {
                handleLogout()
              }
            }}
            >
              <Feather name={item.icon} size={20} color="white" />
              <Text style={styles.optionTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    opacity:1
  },
  username: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 'auto',
    borderRadius: 5,
    borderWidth: 1, // Adding border width
    borderColor: 'white'
  },
  downArrow: {
    marginLeft: 'auto',
    alignItems: "center"
  },
  optionsContainer: {
    position: 'absolute',
    top: 50, // Adjust the top position as needed
    right: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    elevation: 5,
    opacity:1
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color:"white",
    zIndex:1
  },
  optionTitle: {
    fontSize: 16,
    marginLeft: 10,
    color:"white",
    backgroundColor:"black"
  },
  headerText: {
    color: "white",
    fontSize: 20
  }
});