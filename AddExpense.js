
import React from 'react'
import { Text, View } from 'react-native'
import Footer from './Footer'
import HeaderBar from './HeaderBar'

export default function AddExpense() {
  return (
    <View>
        <HeaderBar />
        <Text>Add Expense</Text>
        <Footer />
    </View>
  )
}
