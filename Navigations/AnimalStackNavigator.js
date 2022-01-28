import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnimalDetailScreen from "../Screens/AnimalDetailScreen";
import AnimalsScreen from "../Screens/AnimalsScreen";

const Stack=createStackNavigator();

export default function AnimalStackNavigator(){

return(
   <Stack.Navigator
      initialRouteName={'Animals'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Animals" component={AnimalsScreen} />
      <Stack.Screen name="AnimalDetail" component={AnimalDetailScreen} />
    </Stack.Navigator>
)

}