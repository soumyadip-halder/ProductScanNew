import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import BarcodeScanner from './BarcodeScan';
import FetchData from './FetchData';
import ShowProduct from './ShowProduct';

function ProductMain({route,navigation}) {
   const [isVisible,setVisible]=useState(false);
   const [barcode,setBarcode]=useState('5000382022350');
   const [isModVisib,setModVisib]=useState(false);
   const [isRandom,setRandom]=useState(-1);
   const [orientation,setOrientation]=useState('portrait');
   const [width,setWidth]=useState(0);
   const [height,setHeight]=useState(0);
   const [isValidBarcode,setIsValidBarcode]=useState(true);
   
   const isPortrait=()=>{
        const dim=Dimensions.get('window');
        setWidth(dim.width);
        setHeight(dim.height);
        if (dim.height>=dim.width){
            return 'portrait';
        }
        else if (dim.width>dim.height){
            return 'landscape';
        }
   };

   useEffect(()=>{
       Dimensions.addEventListener('change',()=>setOrientation(isPortrait()));
       return ()=>{
            Dimensions.removeEventListener('change',()=>setOrientation(isPortrait()))
       };
   });
 
   return (
     <>
     {orientation==='portrait'?
     <SafeAreaView style={styles.container}>
       <KeyboardAvoidingView behavior="height">
         <Text>{console.log('Orientation'+orientation)}</Text>
       <View style={{flexDirection:'column', marginStart:Dimensions.get('window').width*0.5}}>
         <View style={styles.heading}>
             <Text style={{fontWeight:'bold', fontSize:25}}>My Product View</Text>
         </View>
       </View>
       <View style={{flexDirection:'column', flex:2,justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontWeight:'bold', fontSize:25, alignSelf: 'flex-start',marginStart:Dimensions.get('window').width*0.1}}>Select Item</Text>      
         {isVisible?(<BarcodeScanner stateVisible={setVisible} getBarcode={setBarcode} modVisib={setModVisib} genRandom={setRandom} orientation={orientation}/>):
         (
         <View style={{borderWidth: 5, borderColor:'black',width:Dimensions.get('window').width*0.9,height: Dimensions.get('window').height*0.115,flexDirection:'row', marginStart:Dimensions.get('window').width*0.035}}>
           <Image style={{width:Dimensions.get('window').width*0.4,height:Dimensions.get('window').height*0.118}} source={require('../images/Barcode_pic.png')}/>
           <Image style={{width:Dimensions.get('window').width*0.2,height:Dimensions.get('window').height*0.1, marginStart:Dimensions.get('window').width*0.27,resizeMode:'stretch'}} source={require('../images/QR_code.png')}/>
         </View>
         )
         }    
         <TouchableOpacity onPress={()=>{console.log('pressed');setVisible(true);setBarcode('');setIsValidBarcode(true)}} style={{marginTop:Dimensions.get('window').height*0.005}}>
           <Image style={{width:Dimensions.get('window').width*0.6, height:Dimensions.get('window').height*0.05, resizeMode:'contain'}} source={require('../images/scan_logo1.png')}/>
         </TouchableOpacity>
       </View>
       <View style={{flexDirection:'column',flex:1}}>
         <View style={{flexDirection:'row',flex:1}}>
           <TextInput placeholder='Search Product' style={{borderStyle: 'solid', borderColor:'black', borderWidth:2, width:Dimensions.get('window').width*0.8,height:Dimensions.get('window').height*0.055,marginStart:Dimensions.get('window').width*0.07}}/>
           <TouchableOpacity onPress={()=>console.log('Searching')}>
             <Image style={{width:Dimensions.get('window').width*0.105,height:Dimensions.get('window').height*0.055,resizeMode:'stretch'}} source={require('../images/search_icon.jpeg')}/>
           </TouchableOpacity>
         </View>
         <TouchableOpacity onPress={()=>{barcode!='' && isValidBarcode && navigation.navigate('ProductShow',{barCode: barcode});}} style={{flexDirection:'row',flex:1, marginStart:Dimensions.get('window').width*0.05}}>  
           <FetchData barCode={barcode} orientation={orientation} setIsValidBarcode={setIsValidBarcode}/>
         </TouchableOpacity>
       </View>
       <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'center'}}>
         <View style={{flexDirection:'row',flex:1,alignItems:'flex-end',justifyContent:'center'}}>
         <TouchableOpacity onPress={()=>{console.log('Ok');setVisible(false)}} style={{}}>
           <Image source={require('../images/ok_logo.jpeg')} style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.1,resizeMode:'contain'}}/>
         </TouchableOpacity>
         </View>
       </View>
       </KeyboardAvoidingView>
       <StatusBar style="auto" />
     </SafeAreaView>
       :
     <SafeAreaView style={styles.container}> 
       <KeyboardAvoidingView behavior="position">
       <ScrollView contentContainerStyle={{width:Dimensions.get('window').width*0.5,alignItems:'center',marginStart:Dimensions.get('window').width*0.2}}>
        <Text>{console.log('from landscape mode: '+orientation)}</Text>
       <View style={{flexDirection:'column', marginStart:Dimensions.get('window').width*0.2}}>
         <Text style={{fontWeight:'bold', fontSize:25}}>My Product View</Text>
       </View>
       <View style={{flexDirection:'column', flex:2}}>
         <Text style={{fontWeight:'bold', fontSize:25, alignSelf: 'flex-start',marginStart:Dimensions.get('window').width*0.05}}>Select Item</Text>      
         {isVisible?(<BarcodeScanner stateVisible={setVisible} getBarcode={setBarcode} modVisib={setModVisib} genRandom={setRandom} orientation={orientation}/>):
         (
         <View style={{borderWidth: 5, borderColor:'black',width:Dimensions.get('window').width*0.5,height: Dimensions.get('window').height*0.2,flexDirection:'row', marginStart:Dimensions.get('window').width*0.051}}>
           <Image style={{width:Dimensions.get('window').width*0.2,height:Dimensions.get('window').height*0.18}} source={require('../images/Barcode_pic.png')}/>
           <Image style={{width:Dimensions.get('window').width*0.14,height:Dimensions.get('window').height*0.175, marginStart:Dimensions.get('window').width*0.14,resizeMode:'stretch'}} source={require('../images/QR_code.png')}/>
         </View>
         )
         }    
         <TouchableOpacity onPress={()=>{console.log('pressed');setVisible(true);setBarcode('');setIsValidBarcode(true)}} style={{marginTop:Dimensions.get('window').height*0.05}}>
           <Image style={{width:Dimensions.get('window').width*0.6, height:Dimensions.get('window').height*0.1, resizeMode:'contain'}} source={require('../images/scan_logo1.png')}/>
         </TouchableOpacity>
       </View>
       <View style={{flexDirection:'column',flex:1}}>
         <View style={{flexDirection:'row',flex:1}}>
           <TextInput placeholder='Search Product' style={{borderStyle: 'solid', borderColor:'black', borderWidth:2, width:Dimensions.get('window').width*0.45,height:Dimensions.get('window').height*0.08,marginStart:Dimensions.get('window').width*0.01,marginTop:Dimensions.get('window').height*0.05}}/>
           <TouchableOpacity onPress={()=>console.log('Searching')}>
             <Image style={{width:Dimensions.get('window').width*0.05,height:Dimensions.get('window').height*0.08,resizeMode:'contain',marginTop:Dimensions.get('window').height*0.05}} source={require('../images/search_icon.jpeg')}/>
           </TouchableOpacity>
         </View>  
       </View>
       <TouchableOpacity onPress={()=>{barcode!='' && isValidBarcode && navigation.navigate('ProductShow',{barCode: barcode});}} style={{flex:1,marginTop:Dimensions.get('window').height*0.05}}>  
         <FetchData barCode={barcode} orientation={orientation} setIsValidBarcode={setIsValidBarcode}/>
       </TouchableOpacity>
       <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'center'}}>
         <View style={{flexDirection:'row',flex:1,alignItems:'flex-end',justifyContent:'center'}}>
         <TouchableOpacity onPress={()=>{console.log('Ok');setVisible(false)}} style={{}}>
           <Image source={require('../images/ok_logo.jpeg')} style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.2,resizeMode:'contain'}}/>
         </TouchableOpacity>
         </View>
       </View>
       </ScrollView>  
       </KeyboardAvoidingView>
       <StatusBar style="auto" />
     </SafeAreaView>}
     </>
   );  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    heading:{
      alignItems: 'flex-end',
    },
});
  
  
export default ProductMain;

