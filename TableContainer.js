import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableContainer = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.row}>
      <Text style={[styles.cell, styles.header]}>Expense Name</Text>
        <Text style={[styles.cell, styles.header]}>Category</Text>  
        <Text style={[styles.cell, styles.header]}>Date</Text>  
        <Text style={[styles.cell, styles.header]}>Price</Text>
       
      </View>

      {/* Table Rows */}
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{item.expenseName}</Text>
          <Text style={styles.cell}>{item.category}</Text>
          <Text style={styles.cell}>{item.date}</Text>    
          <Text style={styles.cell}>${item.price}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
  },
});

export default TableContainer;
