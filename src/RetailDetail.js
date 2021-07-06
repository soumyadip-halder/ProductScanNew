import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView,StyleSheet, Image, Dimensions,View, TouchableOpacity, Text} from 'react-native';
import { useEffect } from 'react/cjs/react.development';


function RetailDetail({navigation,route}) {
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
                <Text style={{alignSelf:'center', fontWeight:'bold'}}>Retail Prices - past 18 months</Text>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>Eff. Date:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{var1.effectiveDate}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
                 </View>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>Price:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{var1.sellingUEP}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
                 </View>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>UOM:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{var1.sellingUnitOfMeasure}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
                 </View>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>Type:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{route.params.urlData.saleType}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
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
                <Text style={{alignSelf:'center', fontWeight:'bold'}}>Retail Prices - past 18 months</Text>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>Eff. Date:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{var1.effectiveDate}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
                 </View>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>Price:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{var1.sellingUEP}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
                 </View>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>UOM:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{var1.sellingUnitOfMeasure}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
                 </View>
                 <View style={{flex:1,borderColor:'black',borderWidth:1}}>
                    <View style={{borderColor:'black',borderBottomWidth:2}}>
                     <Text>Type:</Text>
                    </View>
                    {route.params.priceRet>=200 && route.params.priceRet<299 && route.params.priceData.pricehistory.length>0?(
                     <>
                     {route.params.priceData.pricehistory.map(var1=><Text>{route.params.urlData.saleType}</Text>)}
                     </>
                     )
                     :<Text>Not available PriceApi Returns:{route.params.priceRet}</Text>
                    }
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

export default RetailDetail;