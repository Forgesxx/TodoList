import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert} from "react-native";
import { FlatList } from "react-native-gesture-handler";


interface LineItem {
    id: string;
    content: string;
  }


const MainScreen = () => {
    const [inputText, setInputText] = useState(''); 
    const [lines, setLines] = useState<any[]>([]);

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
        justifyContent: 'center', 
        alignItems: 'center',
       

    },
    inputContainer: {
       
        position: 'absolute',
        marginTop: 530

    },
    
   
})