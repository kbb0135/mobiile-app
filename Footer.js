import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native'; // Import Dimensions
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => toggleOptions()} style={styles.iconContainer}>
                <FontAwesome name="plus" size={30} color="black" />
            </TouchableOpacity>
            {showOptions && (
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionTitle}>Add Expense</Text>
                    <Text style={styles.optionTitle}>Add Saving</Text>
                </View>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('AddExpense')} style={styles.iconContainer}>
                <FontAwesome name="edit" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddExpense')} style={styles.iconContainer}>
                <FontAwesome name="bar-chart" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingVertical: 10,
        position: 'absolute', // Position the footer absolutely
        bottom: 0, // Place it at the bottom of the screen
        width: Dimensions.get('window').width, // Set width to screen width
    },
    iconContainer: {
        paddingHorizontal: 10,
    },
    optionsContainer: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        top: -110,
        left: 0,
        borderWidth: 1, // Adding border width
        borderColor: 'white', // Adding border color
    },
    optionTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        paddingVertical: 8, // Add padding vertically
        paddingHorizontal: 20, // Add padding horizontally
        borderRadius: 5,
        backgroundColor: 'red', // Add background color
        textAlign: 'center', // Center align text
        overflow: 'hidden',
    },
});

export default Footer;
