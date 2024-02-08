import React from 'react'
import { Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Welcome from './Welcome'
import SignUp from './SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Home from './Home';
const Stack = createNativeStackNavigator();
import AddExpense from './AddExpense';
import Footer from './Footer';

export default function App() {


  return (

      <NavigationContainer >
        <Stack.Navigator initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000000', // Background color of the header
            },
            headerTintColor: '#000000', // Text color of the header buttons
            headerTitleStyle: {
              color: '#fff', // Text color of the header title
            },
          }}
        >
          <Stack.Screen name="Footer" component={Footer} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
        </Stack.Navigator>
      </NavigationContainer>


  )


}


