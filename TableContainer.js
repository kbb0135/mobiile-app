import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableContainer = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.header]}>Header 1</Text>
        <Text style={[styles.cell, styles.header]}>Header 2</Text>
        {/* Add more header cells as needed */}
      </View>

      {/* Table Rows */}
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cellData, cellIndex) => (
            <Text key={cellIndex} style={styles.cell}>
              {cellData}
            </Text>
          ))}
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
