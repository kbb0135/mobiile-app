import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { auth, db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import TableContainer from './TableContainer';
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';

export default function ShowExpense() {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            getData();
        }
    }, [currentUser]);


    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, currentUser.uid));
        const dataArray = [];
        querySnapshot.forEach((doc) => {
            // Transforming the date to exclude time
            const transformedData = {
                ...doc.data(),
                date: new Date(doc.data().date.seconds * 1000).toLocaleDateString()
            };
            dataArray.push(transformedData);
        });
        setData(dataArray);
        setLoading(false); // Set loading to false after data is fetched
    };

    return (
        <View>
            <HeaderBar />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                {data? (
                    <><TableContainer data={data} /></>
                ):(
                    <>
                    <Text>No data to display</Text>
                   
                    </>
                )}
                    
                </>
            )}
            <View >
                <Footer />
            </View>

        </View>
    );
}
