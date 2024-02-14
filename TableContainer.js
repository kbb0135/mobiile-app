import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, TouchableWithoutFeedback } from 'react-native';

const TableContainer = ({ data }) => {
  const [longPressedIndex, setLongPressedIndex] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedExpenseName, setEditedExpenseName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editItemIndex, setEditItemIndex] = useState(null); // State to store the index of the item being edited
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPressForEditDelete = (index) => {
    setLongPressedIndex(index);
    setModalVisible(true);
  };

  const handleEditForEditDelete = (index) => {
    setEditItemIndex(index); // Set the index of the item being edited
    setModalVisible(false);
    setEditModalVisible(true);
  };

  const handleEditSave = () => {
    // Perform edit action here using edited values
    // For example, you can update the data array with the edited values
    // data[editItemIndex] = { expenseName: editedExpenseName, category: editedCategory, date: editedDate, price: editedPrice };
    setEditModalVisible(false);
    setEditItemIndex(null); // Reset the index after editing is done
  };
  const handleModalOutsidePress = () => {
    setModalVisible(false); // Close the modal when pressed outside
  };

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
        <TouchableOpacity
          key={index}
          onLongPress={() => handleLongPressForEditDelete(index)}
          style={styles.row}
        >
          <Text style={styles.cell}>{item.expenseName}</Text>
          <Text style={styles.cell}>{item.category}</Text>
          <Text style={styles.cell}>{item.date}</Text>    
          <Text style={styles.cell}>${item.price}</Text>
        </TouchableOpacity>
      ))}

      {/* First Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleEditForEditDelete(longPressedIndex)}>
              <Text style={styles.modalOptionEdit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Delete")}>
              <Text style={styles.modalOptionDelete}>Delete</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={handleModalOutsidePress}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.editExpense}>Edit Expense</Text>
              <Text>Expense Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Expense Name"
                value={editedExpenseName}
                onChangeText={setEditedExpenseName}
              />
              <Text>Category</Text>
              <TextInput
                style={styles.input}
                placeholder="Category"
                value={editedCategory}
                onChangeText={setEditedCategory}
              />
              <Text>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={editedPrice}
                onChangeText={setEditedPrice}
              />
              <Text style={styles.modalOptionEdit}>Save</Text>
              <Button title="Cancel" style={styles.modalOptionEdit} onPress={() => setEditModalVisible(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  modalOptionEdit: {
    fontSize: 18,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    textAlign:"center"
  },
  modalOptionDelete: {
    fontSize: 18,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
    color:"white",
    textAlign:"center"
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%', 
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    width: '100%', 
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginTop: 10,
  },
  editExpense: {
    textAlign:"center",
    marginBottom:10,
    fontSize:20,
    display:"bold",
    


  }
});

export default TableContainer;
