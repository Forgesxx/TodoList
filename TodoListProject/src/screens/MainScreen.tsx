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
import {FlatList} from 'react-native-gesture-handler';
const GetAllItems = 'http://192.168.0.156:8080/getAllItems';
const deleteUrl = 'http://192.168.0.156:8080/deleteItem';
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
  const [lines, setLines] = useState<any[]>([]);
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



  const handleAcceptEdit = (id: string) => {
    const updatedLines = lines.map(item =>
      item.id === id ? {...item, content: inputText} : item,
    );
    setLines(updatedLines);
    setEditingId(null);
    setInputText('');
    setIsEditingMode(false);
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36);
  };
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

  const handleButtonPress = () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'The field must not be empty');
      return;
    }

    if (editingId !== null) {
      const updatedLines = lines.map(item =>
        item.id === editingId ? {...item, content: inputText} : item,
      );
      setLines(updatedLines);
      setEditingId(null);
      setInputText('');
      setIsEditingMode(false);
    } else {
      const newLine: LineItem = {
        id: generateUniqueId(),
        content: inputText,
      };
      setLines([...lines, newLine]);
      setInputText('');
    }
  };
  return (
    <View>
<View>
  <Text>Data from Server:</Text>
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


      <FlatList
        data={lines}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View key={item.id} style={styles.lineItem}>
            {editingId === item.id ? (
              <TextInput
                style={styles.textInputEdit}
                value={inputText}
                onChangeText={hadleInputText}
                defaultValue={inputText}
              />
            ) : (
              <Text>{item.content}</Text>
            )}

            {isEditingMode && editingId === item.id ? (
              <TouchableOpacity onPress={() => handleAcceptEdit(item.id)}>
                <Image
                  source={require('../Images/acceptButton.png')}
                  style={styles.acceptButton}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.ButtonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingId(item.id);
                    setInputText(item.content);
                    setIsEditingMode(true);
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
        )}
      />
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

const styles = StyleSheet.create({
  mainContainer: {},
  textInputEdit: {
    color: 'black',
    backgroundColor: '#ACE8EB',
    borderRadius: 15,
    width: 375,
    flex: 1,
    padding: 10,
  },

  textInput: {
    color: 'black',
    backgroundColor: '#AED5F5',
    borderRadius: 15,
    width: 375,
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#7EADD4',
    borderRadius: 100,
    width: 50,
    height: 50,
    marginTop: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineItem: {
    backgroundColor: '#ACE8EB',
    borderRadius: 20,
    height: 40,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 575,
    alignItems: 'center',
    color: 'black',
  },

  ButtonsContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  editButton: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  deleteButton: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  acceptButton: {
    marginRight: 10,
    width: 30,
    height: 30,
  },
});
