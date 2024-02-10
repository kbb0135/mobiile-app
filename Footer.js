import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();
    const [showOptions, setShowOptions] = useState(false);
    const [editOptions, setEditOptions] = useState(false);
    const [showBar, setShowBar] = useState(false);

    const toggleOptions = () => {
        setEditOptions(false)
        setShowBar(false)
        setShowOptions(!showOptions);
    };
    const toggleEdit =() => {
        setShowOptions(false)
        setShowBar(false)
        setEditOptions(!editOptions);
    }
    const toggleBar= () => {
        setEditOptions(false)
        setShowOptions(false)
        setShowBar(!showBar)
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => toggleOptions()}>
                    <FontAwesome name="plus" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {showOptions && (
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionTitle} onPress={() => navigation.navigate("AddExpense")}>Add Expense</Text>
                    <Text style={styles.optionTitle} onPress={() => navigation.navigate("AddSaving")}>Add Saving</Text>
                </View>
            )}
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => toggleEdit()}>
                    <FontAwesome name="edit" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {editOptions && (
                <View style={styles.editContainer}>
                    <Text style={styles.optionTitle}  onPress={() => navigation.navigate("ShowExpense")}>Show Expense</Text>
                    <Text style={styles.optionTitle}>Show Saving</Text>
                </View>
            )}
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => toggleBar()}>
                    <FontAwesome name="bar-chart" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {showBar && (
                <View style={styles.barContainer}>
                    <Text style={styles.optionTitle} onPress={() => navigation.navigate("AddExpense")}>Compare Expenses</Text>
                    <Text style={styles.optionTitle}>Compare Savings</Text>
                </View>
            )}
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
        position: 'fixed',
        width: Dimensions.get('window').width,
        zIndex:1
        
    },
    iconContainer: {
        paddingHorizontal: 10,
        flex: 1,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        top: -120,
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        left: 0,
        borderWidth: 1,
        borderColor: 'white',
    },
    editContainer: {
        position: 'absolute',
        top: -120,
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        left: '33.333%',
        borderWidth: 1,
        borderColor: 'white',
    },
    barContainer: {
        position: 'absolute',
        top: -120,
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        right: 0,
        borderWidth: 1,
        borderColor: 'white',
    },
    optionTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'red',
        textAlign: 'center',
        overflow: 'hidden',
    },
});

export default Footer;
