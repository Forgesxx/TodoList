import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, Image} from "react-native";
import { FlatList } from "react-native-gesture-handler";


interface LineItem {
    id: string;
    content: string;
  }


const MainScreen = () => {
    const [inputText, setInputText] = useState(''); 
    const [lines, setLines] = useState<any[]>([]);


    const handleDeleteItem = (id: any) => {
        const updatedLines = lines.filter(item => item.id !== id);
        setLines(updatedLines);
      }

    const hadleInputText = (inputText: any) =>{
        setInputText(inputText)
    } 
  
    const handleButtonPress = () => {
        if (inputText.trim() === '') {
            Alert.alert('Error', 'The field must not be empty');
            return;
        }

   
        
        
        const newLine: LineItem = {
            id: String(lines.length + 1),
            content: inputText,
        };
        setInputText(''); 
        setLines([...lines, newLine]);
    };
    
      
    

  
    
    
    
    return(
<View>

        <FlatList
        data={lines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.lineItem}>
            <Text>{item.content}</Text>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
           <Image  source={require('../Images/cross.png')}
            style={{ width: 20, height: 20 }}
            ></Image>
            </TouchableOpacity>
          </View>
        )}
        />
    <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} value={inputText} onChangeText={hadleInputText} />    
        <TouchableOpacity style={styles.addButton} onPress={handleButtonPress} />
    </View>  
    
    
</View>  
  )
}
export default MainScreen


const styles = StyleSheet.create({
    mainContainer:{

    },
    textInput:{
        color: "white",
        backgroundColor: 'black',
        borderRadius: 15,
        width: 400

    },
    addButton: {
        backgroundColor: 'blue',
        borderRadius: 100,
        width: 30,
        height: 30, 
        marginTop: 10
    },
    lineItem:{
        backgroundColor: '#ACE8EB',
        borderRadius: 20,
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
       

    },
    inputContainer: {
       
        position: 'absolute',
        marginTop: 530

    },
    deleteButton: {
    
    },
 
    
   
})