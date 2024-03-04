import React, {useState, useEffect, useMemo, } from 'react';
import
{
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';

import {styles, } from './styles';

interface Item
{
  id: number;
  item: string;
}

import ApiService from './apiServise';

const MainScreen = () =>
{
    const [inputText, setInputText, ] = useState('');
    const [editingId, setEditingId,] = useState<number | null>(null);
    const [isEditingMode, setIsEditingMode,] = useState(false);
    const [data, setData,] = useState<Item[]>([]);
    const [loading, setLoading,] = useState(true);
    const [error, setError,] = useState<Error | null>(null);
    const [originalItemText, setOriginalItemText,] = useState('');

    const apiService = useMemo(() => new ApiService(''), []);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const result = await apiService.getAllItems();
                if (result && result.length > 0)
                {
                    setData(result);
                }
                setLoading(false);
            }
            catch(anError: any)
            {
                console.error('Error fetching data:', anError);
                setError(anError);
                setLoading(false);
            }
        };
        fetchData();
    }, [apiService,]);

    if (loading)
    {
        return <Text>Loading...</Text>;
    }

    if (error)
    {
        return <Text>Error: {error.message}</Text>;
    }

    const handleDeleteItem = async (id: number) =>
    {
        try
        {
            await apiService.deleteItem(id);

            const updatedData = data.filter(item => item.id !== id);
            setData(updatedData);
        }
        catch(anError: any)
        {
            console.error('Error deleting item:', anError.message);
        }
    };

    const hadleInputText = (anInputText: any) =>
    {
        setInputText(anInputText);
        setOriginalItemText(anInputText);
    };

    const handleButtonPress = async () =>
    {
        if (inputText.trim() === '')
        {
            Alert.alert('Error', 'The field must not be empty');
            return;
        }

        try
        {
            await apiService.addItem(inputText);
            const updatedData = await apiService.getAllItems();
            setData(updatedData);
            setInputText('');
        }
        catch(anError: any)
        {
            console.error('Error sending data:', anError.message);
        }
    };

    const handleEditItem = (id: number) =>
    {
        const itemToEdit = data.find(item => item.id === id);
        if (itemToEdit)
        {
            setOriginalItemText(itemToEdit.item);
            setEditingId(id);
            setIsEditingMode(true);
        }
    };

    const handleUpdateItem = async () =>
    {
        if (editingId === null || inputText.trim() === '')
        {
            Alert.alert('Error', 'Invalid input for update');
            return;
        }

        try
        {
            await apiService.changeItemText(editingId, inputText);

            const updatedData = data.map(item =>
                item.id === editingId ? {...item, item: inputText,} : item
            );

            setData(updatedData);
            setEditingId(null);
            setIsEditingMode(false);
            setInputText('');
        }
        catch(anError: any)
        {
            console.error('Error updating item:', anError.message);
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
                                value={originalItemText}
                                onChangeText={hadleInputText}
                            />
                        ) : (
                            <Text>{item.item}</Text>
                        )}

                        {isEditingMode && editingId === item.id ? (
                            <TouchableOpacity onPress={handleUpdateItem}>
                                <Image
                                    source={require('../Images/acceptButton.png')}
                                    style={styles.acceptButton}
                                />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.ButtonsContainer}>
                                <TouchableOpacity onPress={() => handleEditItem(item.id)}>
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
                        style={styles.addButtonImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default MainScreen;
