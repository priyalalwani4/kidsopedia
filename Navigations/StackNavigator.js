import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AlphabetsScreen from "../Screens/AlphabetsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import NumbersScreen from "../Screens/NumbersScreen";
import AnimalStackNavigator from './AnimalStackNavigator'
import ColoursScreen from "../Screens/ColoursScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'Profile'}
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Profile"} component={ProfileScreen}/>        
        <Stack.Screen name={"Alphabets"} component={AlphabetsScreen}/>
        <Stack.Screen name={"Numbers"} component={NumbersScreen}/>
        <Stack.Screen name={"AnimalStackNavigator"} component={AnimalStackNavigator}/>
        <Stack.Screen name={"Colours"} component={ColoursScreen}/>
    </Stack.Navigator>
  );
}
