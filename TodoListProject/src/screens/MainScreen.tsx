/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {styles} from './styles'
const GetAllItems = 'http://192.168.0.156:8080/getAllItems';
const deleteUrl = 'http://192.168.0.156:8080/deleteItem';
const AddItemUrl = 'http://192.168.0.156:8080/addItem';
interface LineItem {
  id: string;
  content: string;
}
interface Item {
    id: number;
    item: string;
  }
const MainScreen = () => {
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GetAllItems, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();

        if (result.length > 0) {
          setData(result);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(deleteUrl , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: [id],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };
  

  const hadleInputText = (inputText: any) => {
    setInputText(inputText);
  };

  const handleButtonPress = async () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'The field must not be empty');
      return;
    }
  
    try {
      const response = await fetch(AddItemUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: inputText,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const fetchDataResponse = await fetch(GetAllItems, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const updatedData = await fetchDataResponse.json();
      setData(updatedData);
  
      setInputText('');
    } catch (error) {
      console.error('Error sending data:', error.message);
    }
  };
  return (
    <View>
<View>
  {data.map(item => (
    <View style={styles.lineItem} key={item.id}>
      {editingId === item.id ? (
        <TextInput
          style={styles.textInputEdit}
          value={inputText}
          onChangeText={hadleInputText}
          defaultValue={inputText}
        />
      ) : (
        <Text>{item.item}</Text>
      )}

      {isEditingMode && editingId === item.id ? (
        <TouchableOpacity>
          <Image
            source={require('../Images/acceptButton.png')}
            style={styles.acceptButton}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.ButtonsContainer}>
          <TouchableOpacity
            onPress={() => {

            }}>
            <Image
              source={require('../Images/edit.png')}
              style={styles.editButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
            <Image
              source={require('../Images/cross.png')}
              style={styles.deleteButton}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  ))}
</View>
    
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={hadleInputText}
          placeholder="Write here"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleButtonPress}>
          <Image
            source={require('../Images/add.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MainScreen;



