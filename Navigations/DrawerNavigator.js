import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AlphabetsScreen from '../Screens/AlphabetsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import NumbersScreen from '../Screens/NumbersScreen';
import AnimalStackNavigator from './AnimalStackNavigator';
import ColoursScreen from '../Screens/ColoursScreen';
import FruitsScreen from '../Screens/FruitsScreen';
import VegetablesScreen from '../Screens/VegetablesScreen';
import Logout from '../Screens/Logout';
import StackNavigator from './StackNavigator';
import CustomSidebarMenu from '../Screens/CustomSideBarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName={'Home'}
        drawerContentOptions={{
          activeTintColor: '#673010',
          inactiveTintColor:"#472000",
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name={'Home'}
          component={ProfileScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name={'Alphabets'}
          component={AlphabetsScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name={'Numbers'}
          component={NumbersScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name={'Animals'}
          component={AnimalStackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name={'Colours'}
          component={ColoursScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name={'Fruits'}
          component={FruitsScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name={'Vegetables'}
          component={VegetablesScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name={'Logout'}
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
