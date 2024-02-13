import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity} from "react-native";
import { FlatList } from "react-native-gesture-handler";





const MainScreen = () => {
    const [inputText, setInputText] = useState(''); 
    const [lines, setLines] = useState<string[]>([]);

    const hadleInputText = (inputText: string) =>{
        setInputText(inputText)
    } 
  
    const handleButtonPress = () => {
        setLines([...lines, inputText]);
        setInputText('');
      };
    

  
    
    
    
    return(
<View>

<FlatList
        data={lines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
 
 
    <TextInput style={styles.textInput} value={inputText} onChangeText={hadleInputText} >

    </TextInput>
    
    
    <TouchableOpacity style={styles.addButton} onPress={handleButtonPress} >
        <Text> 

        </Text>
    </TouchableOpacity>
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
        borderRadius: 15

    },
    addButton:{
        backgroundColor: 'blue',
        padding: 5,
        borderRadius:100,
        width: 30,
    },
   
})