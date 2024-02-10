import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { auth, db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import TableContainer from './TableContainer';

export default function ShowExpense() {
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
            console.log(`${doc.id} => ${doc.data()}`);
            const docDataArray = Object.keys(doc.data()).map(key => doc.data()[key]);
            dataArray.push(docDataArray);
        });
        setData(dataArray);
        setLoading(false); // Set loading to false after data is fetched
    };
    

    return (
        <View>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <TableContainer data={data} />
            )}
        </View>
    );
}
