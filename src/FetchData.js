import React,{useState,useEffect} from 'react';
import { Dimensions, Image, Text,View } from 'react-native';
function FetchData(props) {
    const [urlData,setUrlData]=useState({});
    const [imageUri,setImageUrl]=useState(null);
    const [isImage,setImage]=useState(true);
    const [prodData1,setProduct1]=useState('');
    const [prodData2,setProduct2]=useState('');
    const [prodData3,setProduct3]=useState('');
    const [itemNo,setItemNo]=useState('');
    const [itemDesc,setItemDesc]=useState('');
    const [isValid,setIsValid]=useState(true);
    
    useEffect(()=>{
        const ac=new AbortController();
        if (props.barCode!==''){
        fetch('https://uat-api.morrisons.com/product/v1/items/'+props.barCode+'?apikey=9kBneCRoslTLcnCRrVixVEvHonpDKGU0',{
            headers:{
                Authorization: 'Basic OWtCbmVDUm9zbFRMY25DUnJWaXhWRXZIb25wREtHVTA6ZDJmMEFqRmdCS09lZ1VsWA=='
            }
        }).then(response=>response.json())
        .then(commits=>{
            //console.log('fetch useeffect'+props.barCode);
            setUrlData(commits);
            (commits.imageUrl===null)?setImageUrl(null):setImageUrl(commits.imageUrl[0].url.toString());
            (commits.imageUrl===null)?setImage(false):setImage(true);
            //console.log('image:'+imageUri+' '+commits.imageUrl);
            setProduct1(commits.productDescription.shelfEdgeLabelLine1);
            setProduct2(commits.productDescription.shelfEdgeLabelLine2);
            setProduct3(commits.productDescription.shelfEdgeLabelLine3);
            setItemNo(commits.itemNumber);
            setItemDesc(commits.itemDescription);
            setIsValid(true);
        }).catch(error=>{props.setIsValidBarcode(false);setIsValid(false)});}
        return ac.abort();
    },[props.barCode]);
    return(
        <>
        {props.orientation=='portrait'?
        <>
            {isImage && (props.barCode!=='') && isValid?<Image source={{uri: imageUri}} style={{width:Dimensions.get('window').width*0.25, height:Dimensions.get('window').height*0.12, resizeMode:'contain', borderWidth:2, borderColor:'black'}}/>:
                <Image source={require('../images/No_image.png')} style={{width:Dimensions.get('window').width*0.25, height:Dimensions.get('window').height*0.12, resizeMode:'contain', borderWidth:2, borderColor:'black'}}/>
            }
            <View style={{borderColor:'black',borderWidth:2,marginStart:5,width:Dimensions.get('window').width*0.64, height:Dimensions.get('window').height*0.12}}>
                {props.barCode!=='' && isValid ?
                <View>
                <Text numberOfLines={1} adjustsFontSizeToFit>{itemNo}</Text>
                <Text numberOfLines={1} adjustsFontSizeToFit>{itemDesc}</Text>
                <Text numberOfLines={1} adjustsFontSizeToFit>{prodData1.trim()} {prodData2.trim()} {prodData3.trim()}</Text>
                </View>
                :
                <View key={Math.random()}>
                <Text></Text>
                <Text style={{color:'red',fontWeight:'bold'}}>Please select a proper product barcode</Text>
                <Text></Text>
                </View>
                }   
            </View>
        </>
        :
        <View style={{flex:1,flexDirection:'row'}}>
            {isImage && (props.barCode!=='') && isValid?<Image source={{uri: imageUri}} style={{width:Dimensions.get('window').width*0.16, height:Dimensions.get('window').height*0.3, resizeMode:'contain', borderWidth:2, borderColor:'black',marginStart:Dimensions.get('window').width*0.001}}/>:
                <Image source={require('../images/No_image.png')} style={{width:Dimensions.get('window').width*0.16, height:Dimensions.get('window').height*0.3, resizeMode:'contain', borderWidth:2, borderColor:'black',marginStart:Dimensions.get('window').width*0.001}}/>
            }
            <View style={{borderColor:'black',borderWidth:2,marginStart:5,width:Dimensions.get('window').width*0.33, height:Dimensions.get('window').height*0.3}}>
                {props.barCode!=='' && isValid?
                <View>
                <Text  numberOfLines={1} adjustsFontSizeToFit>{itemNo}</Text>
                <Text  numberOfLines={1} adjustsFontSizeToFit>{itemDesc}</Text>
                <Text  numberOfLines={1} adjustsFontSizeToFit>{prodData1.trim()} {prodData2.trim()} {prodData3.trim()}</Text>
                </View>
                :
                <View key={Math.random()}>
                <Text></Text>
                <Text style={{color:'red',fontWeight:'bold'}}>Please select a proper product barcode</Text>
                <Text></Text>
                </View>
                }   
            </View>
        </View>}
        </>
    );
}

export default FetchData;