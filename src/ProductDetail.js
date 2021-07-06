import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView,StyleSheet, Image, Dimensions,View, TouchableOpacity, Text} from 'react-native';
import { useEffect } from 'react/cjs/react.development';


function ProductDetail({navigation,route}) {
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
                 <Text>MAN:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.parentItemNumber}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>MIN:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.itemNumber}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Primary PIN:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.gtins[0].id}</Text>
                 </View>
                </View>
                 {(route.params.urlData.packs.length>0)?(
                 <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                     <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                     <Text>Pack Quantity, Pack Number:</Text>
                     </View>
                     <View style={{flex:1}}>
                     {route.params.urlData.packs.map(pack=>
                     <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}} key={pack.packNumber}>
                     <Text>{pack.packQuantity} , {pack.packNumber}</Text>
                     </View>
                     )}
                     </View>
                 </View>)
                     :
                 (<View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                    <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                    <Text>Pack Quantity, Pack Number:</Text>
                    </View>
                    <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                    <Text>Not available</Text>
                    </View>
                 </View>)
                    }
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Item Description:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.itemDescription}</Text>
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Item Details:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.productDescription.shelfEdgeLabelLine1.trim()} {route.params.urlData.productDescription.shelfEdgeLabelLine2.trim()} {route.params.urlData.productDescription.shelfEdgeLabelLine3.trim()}</Text>           
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Nutritional Summary:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.urlData.nutritionalHeading!=null?<Text>{route.params.urlData.nutritionalHeading}</Text>:
                    <Text>Not available</Text>}
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Store Live Date:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.storeLiveDate}</Text>           
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Net Content:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.unitEquivalentPrice.netContent} {route.params.urlData.unitEquivalentPrice.unitOfMeasureCode}</Text>           
                 </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Sell By:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 <Text>{route.params.urlData.sellBy}</Text>           
                 </View>
                </View>

                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                 <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                 <Text>Product:</Text>
                 </View>
                 <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                 {route.params.urlData.productMarketing!=null?<Text>{route.params.urlData.productMarketing}</Text>:
                       <Text>NA</Text>}
                 </View>
                </View>
                
                {(route.params.urlData.allergenInfo.length>0)?(
                 <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                     <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                     <Text>Allergen Information:</Text>
                     </View>
                     <View style={{flex:1}}>
                     {route.params.urlData.allergenInfo.map(pack=>
                     <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}} key={pack.name}>
                     <Text>{pack.value} {pack.name}</Text>
                     </View>
                     )}
                     </View>
                 </View>)
                     :
                 (<View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                    <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                    <Text>Allergen Information:</Text>
                    </View>
                    <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                    <Text>Not available</Text>
                    </View>
                 </View>)
                    }
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
                <Text>MAN:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.parentItemNumber}</Text>
                </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>MIN:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.itemNumber}</Text>
                </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Primary PIN:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.gtins[0].id}</Text>
                </View>
                </View>
                {(route.params.urlData.packs.length>0)?(
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                    <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                    <Text>Pack Quantity, Pack Number:</Text>
                    </View>
                    <View style={{flex:1}}>
                    {route.params.urlData.packs.map(pack=>
                    <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}} key={pack.packNumber}>
                    <Text>{pack.packQuantity} , {pack.packNumber}</Text>
                    </View>
                    )}
                    </View>
                </View>)
                    :
                (<View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                    <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                    <Text>Pack Quantity, Pack Number:</Text>
                    </View>
                    <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                    <Text>Not available</Text>
                    </View>
                </View>)
                    }
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Item Description:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.itemDescription}</Text>
                </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Item Details:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.productDescription.shelfEdgeLabelLine1.trim()} {route.params.urlData.productDescription.shelfEdgeLabelLine2.trim()} {route.params.urlData.productDescription.shelfEdgeLabelLine3.trim()}</Text>           
                </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Nutritional Summary:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                {route.params.urlData.nutritionalHeading!=null?<Text>{route.params.urlData.nutritionalHeading}</Text>:
                    <Text>Not available</Text>}
                </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Store Live Date:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.storeLiveDate}</Text>           
                </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Net Content:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.unitEquivalentPrice.netContent} {route.params.urlData.unitEquivalentPrice.unitOfMeasureCode}</Text>           
                </View>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Sell By:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                <Text>{route.params.urlData.sellBy}</Text>           
                </View>
                </View>

                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                <Text>Product:</Text>
                </View>
                <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                {route.params.urlData.productMarketing!=null?<Text>{route.params.urlData.productMarketing}</Text>:
                    <Text>NA</Text>}
                </View>
                </View>
                
                {(route.params.urlData.allergenInfo.length>0)?(
                <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                    <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                    <Text>Allergen Information:</Text>
                    </View>
                    <View style={{flex:1}}>
                    {route.params.urlData.allergenInfo.map(pack=>
                    <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}} key={pack.name}>
                    <Text>{pack.value} {pack.name}</Text>
                    </View>
                    )}
                    </View>
                </View>)
                    :
                (<View style={{flexDirection:'row',flex:1,justifyContent:'space-around',borderColor:'black',borderWidth:2}}>
                    <View style={{justifyContent:'center',flex:1,flexDirection:'row'}}>
                    <Text>Allergen Information:</Text>
                    </View>
                    <View style={{justifyContent:'flex-start',flex:1,flexDirection:'row'}}>
                    <Text>Not available</Text>
                    </View>
                </View>)
                    }
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

export default ProductDetail;