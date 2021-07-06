import {Camera} from 'expo-camera';
//import { BarCodeScanner} from 'expo-barcode-scanner';z
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';

function BarcodeScanner(props) {
    const [hasPermission,setHasPermission]=useState(null);
    const [scanned, setScanned]=useState(false);
    const [barCodeText,setBarcodeText]=useState(null);
    useEffect(()=>{
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[])

    const handleBarCodeScanned = ({ type, data, ...args}) => {
        //const width = Dimensions.get('window').width;
        //const height = Dimensions.get('window').height;
        //const x=width-140;
        //const y=args.bounds.origin.y;
        //if (y>0 && y<30){
        setScanned(true);
        setBarcodeText(data);
        alert(`Bar code has been scanned successfully. Tap product icon below to know more!`);
        //}
    };

    const handleReturn=()=>{    
        props.genRandom(()=>Math.random());
        props.stateVisible(false);
        props.getBarcode(barCodeText);
        props.modVisib(true);
        setHasPermission(false);
        console.log(barCodeText+' '+typeof(barCodeText));
    };

    return(
        <>
        {props.orientation=='portrait'?
        <View style={{borderWidth: 5, borderColor:'black',width:Dimensions.get('window').width*0.9,height: Dimensions.get('window').height*0.115,flexDirection:'row', marginStart:Dimensions.get('window').width*0.035}}>
        {hasPermission?
        <Camera 
            onBarCodeScanned={scanned ? handleReturn : handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}
        />:
        (<>
          <Image style={{width:Dimensions.get('window').width*0.4,height:Dimensions.get('window').height*0.118}} source={require('../images/Barcode_pic.png')}/>
          <Image style={{width:Dimensions.get('window').width*0.2,height:Dimensions.get('window').height*0.1, marginStart:Dimensions.get('window').width*0.27,resizeMode:'stretch'}} source={require('../images/QR_code.png')}/>
          <Text>{console.log('from barcodescan ')}</Text>
        </>)
        }
        </View>
        :
        <View style={{borderWidth: 5, borderColor:'black',width:Dimensions.get('window').width*0.5,height: Dimensions.get('window').height*0.2,flexDirection:'row', marginStart:Dimensions.get('window').width*0.051}}>
        {hasPermission?
        <Camera 
            onBarCodeScanned={scanned ? handleReturn : handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}
        />:
        (<>
          <Image style={{width:Dimensions.get('window').width*0.2,height:Dimensions.get('window').height*0.18}} source={require('../images/Barcode_pic.png')}/>
          <Image style={{width:Dimensions.get('window').width*0.14,height:Dimensions.get('window').height*0.175, marginStart:Dimensions.get('window').width*0.14,resizeMode:'stretch'}} source={require('../images/QR_code.png')}/>
          <Text>{console.log('from barcodescan ')}</Text>
        </>)
        }
        </View>}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    }
});

export default BarcodeScanner;