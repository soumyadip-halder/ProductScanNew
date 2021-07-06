import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView,StyleSheet, Image, Dimensions,View, TouchableOpacity, Text} from 'react-native';
import { useEffect } from 'react/cjs/react.development';


function PriceDetail({navigation,route}) {
    const [orientation,setOrientation]=useState((Dimensions.get('window').height>=Dimensions.get('window').width)?'portrait':'landscape');
    const isPortrait=()=>{
        const dim=Dimensions.get('window');
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
            Dimensions.removeEventListener('change',()=>setOrientation(isPortrait()));
            }
        }
    );

    return(
        <>
        {orientation==='portrait'?
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{width:Dimensions.get('window').width*0.9,alignItems:'center',marginStart:Dimensions.get('window').width*0.045}}>
                <ScrollView horizontal={true}>
                <View style={{flex:1,flexDirection:'row'}}>
                {route.params.isImage?(
                    <>
                    {route.params.urlData.imageUrl.length>0?(
                    <>
                     {route.params.urlData.imageUrl.map(urld=><Image key={urld.url.toString()} source={{uri: urld.url.toString()}} 
                     style={{width:Dimensions.get('window').width*0.9, height:Dimensions.get('window').height*0.4,resizeMode:'stretch',borderWidth:2,borderColor:'black'}}/>)}
                    </>)
                    :
                    (<>
                     <Image source={require('../images/No_image.png')} style={{borderWidth:2,borderColor:'black',width:Dimensions.get('window').width*0.9, height:Dimensions.get('window').height*0.4, resizeMode:'stretch'}}/>
                    </>)
                    }
                    </>
                )
                :
                <Image source={require('../images/No_image.png')} style={{borderWidth:2,borderColor:'black',width:Dimensions.get('window').width*0.9, height:Dimensions.get('window').height*0.4, resizeMode:'stretch'}}/>}  
                </View>
                </ScrollView>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Primary Supplier:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.supplySource}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Supplier Site:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.area}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Sourcing Country:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.originCntry}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Currency:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.priceRet>=200 && route.params.priceRet<=299?<Text>{route.params.currency}</Text>:<Text>Details can't be fetched error: {route.params.priceRet}</Text>}
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Case Cost:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.priceRet>=200 && route.params.priceRet<=299?<Text>{route.params.caseCost}</Text>:<Text>Details can't be fetched error: {route.params.priceRet}</Text>}
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Item Cost:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.priceRet>=200 && route.params.priceRet<=299?<Text>{route.params.perUnit}</Text>:<Text>Details can't be fetched error: {route.params.priceRet}</Text>}
                 </View>
                </View> 
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Duty:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>0</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Gross Margin (Excl VAT):</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text> </Text>
                 </View>
                </View>

            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
             <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>{console.log('Ok');navigation.navigate('ProductShow');}} style={{alignSelf:'flex-end'}}>
                    <Image source={require('../images/ok_logo.jpeg')} style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.1,resizeMode:'contain',alignSelf:'flex-end'}}/>
                </TouchableOpacity>
             </View>
            </View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
        :
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{width:Dimensions.get('window').width*0.5,alignItems:'center',marginStart:Dimensions.get('window').width*0.2}}>
                <ScrollView horizontal={true}>
                <View style={{flex:1,flexDirection:'row'}}>
                {route.params.isImage?(
                    <>
                    {route.params.urlData.imageUrl.length>0?(
                    <>
                    {route.params.urlData.imageUrl.map(urld=><Image source={{uri: urld.url.toString()}} key={urld.url.toString()} 
                    style={{width:Dimensions.get('window').width*0.5, height:Dimensions.get('window').height*0.5,resizeMode:'stretch',borderWidth:2,borderColor:'black'}}/>)}
                    </>)
                    :
                    (<>
                    <Image source={require('../images/No_image.png')} style={{borderWidth:2,borderColor:'black',width:Dimensions.get('window').width*0.5, height:Dimensions.get('window').height*0.5, resizeMode:'stretch'}}/>
                    </>)
                    }
                    </>
                )
                :
                <Image source={require('../images/No_image.png')} style={{borderWidth:2,borderColor:'black',width:Dimensions.get('window').width*0.5, height:Dimensions.get('window').height*0.5, resizeMode:'stretch'}}/>}  
                </View>
                </ScrollView>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Primary Supplier:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.supplySource}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Supplier Site:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.area}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Sourcing Country:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.originCntry}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Currency:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.priceRet>=200 && route.params.priceRet<=299?<Text>{route.params.currency}</Text>:<Text>Details can't be fetched error: {route.params.priceRet}</Text>}
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Case Cost:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.priceRet>=200 && route.params.priceRet<=299?<Text>{route.params.caseCost}</Text>:<Text>Details can't be fetched error: {route.params.priceRet}</Text>}
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Item Cost:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.priceRet>=200 && route.params.priceRet<=299?<Text>{route.params.perUnit}</Text>:<Text>Details can't be fetched error: {route.params.priceRet}</Text>}
                 </View>
                </View> 
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Duty:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>0</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Gross Margin (Excl VAT):</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text> </Text>
                 </View>
                </View>
           
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>{console.log('Ok');navigation.navigate('ProductShow');}} style={{alignSelf:'flex-end'}}>
                    <Image source={require('../images/ok_logo.jpeg')} style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.2,resizeMode:'contain',alignSelf:'flex-end'}}/>
                </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
        }
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
    }
  });

export default PriceDetail;