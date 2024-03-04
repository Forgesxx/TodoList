import * as React from 'react';
import {NavigationContainer, } from '@react-navigation/native';
import {createStackNavigator, } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import SecondScreen from './src/screens/SecondScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element
{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="SecondScreen" component={SecondScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
