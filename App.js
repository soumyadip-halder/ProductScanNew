import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Button } from 'react-native';
import {NavigationContainer}  from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductMain from './src/ProductMain';
import ShowProduct from './src/ShowProduct';
import ProductDetail from './src/ProductDetail';
import DimensionDetl from './src/DimensionDetl';
import PriceDetail from './src/PriceDetail';
import RetailDetail from './src/RetailDetail';
import InventoryDetl from './src/InventoryDetl';

const Stack=createStackNavigator();
const Drawer=createDrawerNavigator();

function LogoTitle(){
  return (
    <View>
      <Image source={require('./images/Morrisons_logo.png')} style={{width:100,height:30,resizeMode:'stretch'}}/>
    </View>
  );
}
/*function ProductScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Product Screen</Text>
    </SafeAreaView>
  );
}*/
function PagesScreen(){
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pages Screen</Text>
    </SafeAreaView>
  );
}
function ProductScreenStack({navigation}){
  return(
    <Stack.Navigator
      screenOptions={{
        headerTitle: props=><LogoTitle {...props}/>,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ()=>(           
          <TouchableOpacity onPress={()=>{navigation.navigate('ProductMain')}}>
            <Image style={{width:50,height:40,resizeMode:'contain'}} source={require('./images/Home_logo.png')}/>
          </TouchableOpacity>          
        ),
        headerLeft: ()=>(
          <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
            <Image style={{width:30,height:30,resizeMode:'contain'}} source={require('./images/Menu_icon.png')}/>
          </TouchableOpacity>
        )   
      }}>
      <Stack.Screen name="ProductMain" component={ProductMain}/>
      <Stack.Screen name="ProductShow" component={ShowProduct}/>
      <Stack.Screen name="ProductDetl" component={ProductDetail}/>
      <Stack.Screen name="Dimension" component={DimensionDetl}/>
      <Stack.Screen name="PriceDetl" component={PriceDetail}/>
      <Stack.Screen name="RetailPrice" component={RetailDetail}/>
      <Stack.Screen name="Inventory" component={InventoryDetl}/>
    </Stack.Navigator>
  );
}

function PageScreenStack({navigation}){
  return(
    <Stack.Navigator screenOptions={{
      headerTitle: props=><LogoTitle {...props}/>,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: ()=>(           
        <TouchableOpacity onPress={()=>console.log('Product main')}>
          <Image style={{width:50,height:40,resizeMode:'stretch'}} source={require('./images/Home_logo.png')}/>
        </TouchableOpacity>          
      ),
      headerLeft: ()=>(
        <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
          <Image style={{width:30,height:30,resizeMode:'stretch'}} source={require('./images/Menu_icon.png')}/>
        </TouchableOpacity>
      )   
    }}>
      <Stack.Screen name="PagesPage" component={PagesScreen}/>
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Product' >
        <Drawer.Screen name="Product" component={ProductScreenStack} options={{drawerLabel: 'Product Main'}}/>
        <Drawer.Screen name="Page" component={PageScreenStack} options={{drawerLabel: 'Pages'}}/>
      </Drawer.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
