import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView,Dimensions, ScrollView } from 'react-native';

function ShowProduct({navigation,route}) {
  //const [isVisible,setVisible]=useState(false);
  //const [barcode,setBarcode]=useState(null);
  const [urlData,setUrlData]=useState({});
  const [isImage,setImage]=useState(true);
  const [imageUri,setImageUrl]=useState(null);
  const [prodData1,setProduct1]=useState('');
  const [prodData2,setProduct2]=useState('');
  const [prodData3,setProduct3]=useState('');
  const [packQuantity,setPack]=useState('');
  const [packNumber,setPackNo]=useState('');
  const [dimLength,setDimlen]=useState('');
  const [dimWidth,setDimWid]=useState('');
  const [dimWeight,setDimWeight]=useState('');
  const [dimHeight,setDimHeight]=useState('');
  const [netCont,setNetContent]=useState('');
  const [caseNetWght,setCaseNetWght]=useState('');
  const [supplySource,setSource]=useState('');
  const [originCntry,setOrigin]=useState('');
  const [vatRate,setVatRate]=useState('');
  const [area,setArea]=useState('');
  const [depoStock,setDepoStock]=useState(0);
  const [storeStock,setStoreStock]=useState(0);
  const [totalStock,setTotal]=useState(0);
  const [currency,setCurrency]=useState('');
  const [perUnit,setPerUnit]=useState('');
  const [itemCost,setItemCost]=useState('');
  const [regPrice,setRegPrice]=useState('');
  const [uom,setUom]=useState('');
  const [itemNo,setItemNo]=useState('');
  const [itemDesc,setItemDesc]=useState('');
  const [itemParent,setItemParent]=useState('');
  const [orientation,setOrientation]=useState('portrait');
  const [rmsData,setRmsData]=useState({});
  const [priceData,setPriceData]=useState({});
  const [rmsRet,setRmsRet]=useState(200);
  const [priceRet,setPriceRet]=useState(200);

  const isPortrait=()=>{
    const dim=Dimensions.get('window');
    if (dim.height>=dim.width){
      return 'portrait';
    }
    else if (dim.width>dim.height){
      return 'landscape';
    }
  }

  useEffect(()=>{
    const ac=new AbortController();
    let fetchmain=fetch('https://uat-api.morrisons.com/product/v1/items/'+route.params.barCode+'?apikey=9kBneCRoslTLcnCRrVixVEvHonpDKGU0',{
            headers:{
                Authorization: 'Basic OWtCbmVDUm9zbFRMY25DUnJWaXhWRXZIb25wREtHVTA6ZDJmMEFqRmdCS09lZ1VsWA=='
            }
        }).then(response=>response.json())
        .then(commits=>{
            setUrlData(commits);
            (commits.imageUrl===null)?setImageUrl(null):setImageUrl(commits.imageUrl[0].url.toString());
            (commits.imageUrl===null)?setImage(false):setImage(true);
            setProduct1(commits.productDescription.shelfEdgeLabelLine1);
            setProduct2(commits.productDescription.shelfEdgeLabelLine2);
            setProduct3(commits.productDescription.shelfEdgeLabelLine3);
          //  console.log('image:'+imageUri+' '+commits.imageUrl);
            (commits.packs.length>0)?(setPack(commits.packs[0].packQuantity)):
            setPack('NA');
            (commits.packs.length>0)?(setPackNo(commits.packs[0].packNumber)):
            setPack('NA');
            setItemNo(commits.itemNumber);
            setItemDesc(commits.itemDescription);
            setItemParent(commits.parentItemNumber);
            setDimlen(commits.dimensions.length);
            setDimWid(commits.dimensions.width);
            setDimWeight(commits.dimensions.weight);
            setDimHeight(commits.dimensions.height);
            (commits.unitEquivalentPrice===null)?setNetContent('NA'):setNetContent(commits.unitEquivalentPrice.netContent);
            (commits.unitEquivalentPrice===null)?setCaseNetWght('NA'):setCaseNetWght(commits.unitEquivalentPrice.netContent+commits.unitEquivalentPrice.unitOfMeasureCode);
            setSource(commits.supplySource);
            setOrigin(commits.countryOfOrigin);
            setVatRate(commits.vatRate);
            setOrientation((Dimensions.get('window').height>=Dimensions.get('window').width)?'portrait':'landscape');
            console.log('in ShowProducts');
            return commits.itemNumber;
        }).catch(error=>console.log(' Product Api '+error.message));

        fetchmain.then(result=>{
          fetch('https://sit-api.morrisons.com/stock/v2/items/'+result+'/rmsstock?stockFilter=true&apikey=hSa6mG9aG7qd5oZ2Fw8Q06ptjEMetTk2&channels=stores,depots,online,wholesale',{
              headers:{
                  Authorization: 'Basic aFNhNm1HOWFHN3FkNW9aMkZ3OFEwNnB0akVNZXRUazI6RGRjSkltVWluZzEwZXRTdQ=='
              }
          }).then(response=>response.ok?response:setRmsRet(response.status)).then(response=>response.json()).then(commits=>{setRmsData(commits);
                                                            //setArea(commits.rmsStockResponse[0].storeChannel.map(val=>{val.locationID==3 && val.area}));
                                                            for (const val of commits.rmsStockResponse[0].storeChannel){                                                     
                                                              if (val.locationID==3){
                                                                setArea(val.area+' '+val.locationName);                                                         
                                                                break;
                                                              }
                                                            };                                                           
                                                            let res=0;
                                                            for (const val of commits.rmsStockResponse[0].depoChannel){
                                                              res=res+Number(val.SOH)
                                                            };
                                                            setDepoStock(res);
                                                            let res1=0;
                                                            for (const val of commits.rmsStockResponse[0].storeChannel){
                                                              res1=res1+Number(val.SOH)
                                                            };
                                                            setStoreStock(res1);
                                                            setTotal(res+res1);
                                                            return commits.rmsStockResponse[0].itemNumber;
                                                          })}).catch(error=>console.log('Rms api :'+error.message));

        fetchmain.then(result=>{
              fetch('https://uat-api.morrisons.com/price/v2/locations/3/items/'+result+'/history?apikey=hXJCvTlKG8gcue4lwBNNS1iIdmXRKuoH',{
                  headers:{
                      Authorization: 'Basic aFhKQ3ZUbEtHOGdjdWU0bHdCTk5TMWlJZG1YUkt1b0g6MFYwazBBdTVMZjVmTUk0RA=='
                  }
              }).then(response=>response.ok?response:setPriceRet(response.status)).then(response=>response.json()).then(commits=>{setPriceData(commits);
                                                                setCurrency(commits.pricehistory[0].sellingUEP.charAt(0));
                                                                setPerUnit(commits.pricehistory[0].sellingUEP);
                                                                setRegPrice(commits.pricehistory[0].sellingUEP.charAt(0)+commits.pricehistory[0].regularPrice.toString());
                                                                setUom(commits.pricehistory[0].sellingUnitOfMeasure);
                                                                setItemCost(parseFloat(commits.pricehistory[0].sellingUEP.slice(1)));
                                                              })
                                                            }
      ).catch(error=>console.log(error.message));
        return ()=>ac.abort();
  },[route.params.barCode]
  );

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
      <ScrollView horizontal={false} contentContainerStyle={{width:Dimensions.get('window').width}}>
      <View style={{flexDirection:'column', marginStart:Dimensions.get('window').width*0.5}}>
        <Text style={{fontWeight:'bold', fontSize:25}}>My Product View</Text>    
      </View>
      <View style={{width:Dimensions.get('window').width-10,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Product Details</Text>  
      <View style={{flexDirection:'row',flex:1}}>
        {isImage?<Image source={{uri: imageUri}} style={{width:Dimensions.get('window').width*0.3, height:Dimensions.get('window').height*0.2,resizeMode:'stretch'}}/>:
                <Image source={require('../images/No_image.png')} style={{width:Dimensions.get('window').width*0.3, height:Dimensions.get('window').height*0.2, resizeMode:'stretch'}}/>}
        <View style={{width:Dimensions.get('window').width*0.6,height:Dimensions.get('window').height*0.22}}>
           <Text></Text>
           <Text>MAN: {itemParent}</Text>
           <Text>MIN: {itemNo}</Text>
           <Text>Primary PIN:{route.params.barCode}</Text>
           <>
           {packQuantity!=='NA'?<Text>Pack Quantity: {packQuantity}</Text>:
                        <Text>Pack Quantity: Not available</Text>}
           </>
           <Text>{itemDesc}</Text>
           <Text>{prodData1.trim()} {prodData2.trim()} {prodData3.trim()}</Text>           
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('ProductDetl',{urlData: urlData,isImage:isImage})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.075,height:Dimensions.get('window').height*0.025,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View>
      </View>
      <View style={{width:Dimensions.get('window').width-10,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Dimension</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.1}}>
         <Text></Text>
         {packQuantity!=='NA'?<Text>Case Size: {packQuantity}</Text>:
                        <Text>Case Size: Not available</Text>}
         {packNumber!=='NA'?<Text>Pack Number: {packNumber}</Text>:
                        <Text>Pack Number: Not available</Text>}
         <Text>Case Length: {dimLength}</Text>
         <Text>Case Width: {dimWidth}</Text>
         <Text>Case Height: {dimHeight}</Text>
         <Text>Case Weight: {dimWeight}</Text>
         <Text>Case Net Weight: {caseNetWght}</Text>
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Dimension',{isImage:isImage,dimLength: dimLength,dimWidth:dimWidth,dimHeight:dimHeight,dimWeight:dimWeight,caseNetWght:caseNetWght,urlData:urlData})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.075,height:Dimensions.get('window').height*0.025,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      <View style={{width:Dimensions.get('window').width-10,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Supplier and Cost Price</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.1}}>
         <Text></Text>
         <Text>Primary Supplier: {supplySource}</Text>
         {rmsRet>=200 && rmsRet<=299?<Text>Supplier Site: {area}</Text>:<Text>Supplier Site: Details can't be fetched RMS server error: {rmsRet}</Text>}
         <Text>Sourcing Country: {originCntry}</Text>
         {priceRet>=200 && priceRet<=299?<Text>Currency: {currency}</Text>:<Text>Currency: Details can't be fetched error: {priceRet}</Text>}
         {priceRet>=200 && priceRet<=299?<Text>Case Cost: {currency+((netCont/1000)*itemCost)} per case</Text>:<Text>Case Cost: Details can't be fetched error: {priceRet}</Text>}
         {priceRet>=200 && priceRet<=299?<Text>Item Cost: {perUnit}</Text>:<Text>Item Cost: Details can't be fetched error: {priceRet}</Text>}
         <Text>Duty : 0</Text>
         <Text>Gross Margin (Excl VAT):</Text>
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('PriceDetl',{rmsRet:rmsRet,priceRet:priceRet,isImage:isImage,urlData:urlData,supplySource:supplySource, area:area, originCntry:originCntry, currency:currency,perUnit:perUnit,caseCost:(currency+((netCont/1000)*itemCost))})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.075,height:Dimensions.get('window').height*0.025,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      <View style={{width:Dimensions.get('window').width-10,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Retail Price</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.1}}>
         <Text></Text>
         {priceRet>=200 && priceRet<=299?<Text>Retail Price: {regPrice}</Text>:<Text>Retail Price: Details can't be fetched error: {priceRet}</Text>}
         <Text>Offer: </Text>  
         {priceRet>=200 && priceRet<=299?<Text>Unit Equivalent Price: {perUnit}</Text>:<Text>Unit Equivalent Price: Details can't be fetched error: {priceRet}</Text>}
         <Text>Vat Rate: {vatRate}</Text>
         {priceRet>=200 && priceRet<=299?<Text>Selling Unit of Measure: {uom} per case</Text>:<Text>Selling Unit of Measure: Details can't be fetched error: {priceRet}</Text>}
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('RetailPrice',{rmsRet:rmsRet,priceRet:priceRet,isImage:isImage,urlData:urlData,priceData:priceData})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.075,height:Dimensions.get('window').height*0.025,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      <View style={{width:Dimensions.get('window').width-10,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Inventory</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.1}}>
         <Text></Text>
         {rmsRet>=200 && rmsRet<=299?<Text>Depot Stock: {depoStock}</Text>:<Text>Depot Stock: Details can't be fetched RMS server error: {rmsRet}</Text>}
         {rmsRet>=200 && rmsRet<=299?<Text>Store Stock: {storeStock}</Text>:<Text>Store Stock: Details can't be fetched RMS server error: {rmsRet}</Text>}
         {rmsRet>=200 && rmsRet<=299?<Text>Total Stock: {totalStock}</Text>:<Text>Total Stock: Details can't be fetched RMS server error: {rmsRet}</Text>}
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Inventory',{rmsRet:rmsRet,isImage:isImage,urlData: urlData,depoStock:depoStock,storeStock:storeStock,totalStock:totalStock})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.075,height:Dimensions.get('window').height*0.025,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>{console.log('Ok');navigation.navigate('ProductMain');}} style={{alignSelf:'flex-end'}}>
            <Image source={require('../images/ok_logo.jpeg')} style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.1,resizeMode:'contain',alignSelf:'flex-end'}}/>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>      
      <StatusBar style="auto" />
    </SafeAreaView>
    :
    <SafeAreaView style={styles.container}>   
      <ScrollView contentContainerStyle={{width:Dimensions.get('window').width*0.6,justifyContent:'flex-start',marginStart:Dimensions.get('window').width*0.15}}>  
      <View style={{flexDirection:'column', marginStart:Dimensions.get('window').width*0.3}}>
        <Text style={{fontWeight:'bold', fontSize:25}}>My Product View</Text>    
      </View>     
      <ScrollView horizontal={true}>
      <View style={{flexDirection:'row'}}>
      <View style={{width:Dimensions.get('window').width*0.465,height:Dimensions.get('window').height*0.6,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Product Details</Text>  
      <View style={{flexDirection:'row',flex:1}}>
        {isImage?<Image source={{uri: imageUri}} style={{width:Dimensions.get('window').width*0.2, height:Dimensions.get('window').height*0.5,resizeMode:'stretch'}}/>:
                <Image source={require('../images/No_image.png')} style={{width:Dimensions.get('window').width*0.2, height:Dimensions.get('window').height*0.5, resizeMode:'stretch'}}/>}
        <View style={{width:Dimensions.get('window').width*0.2,height:Dimensions.get('window').height*0.3}}>
           <Text></Text>
           <Text>MAN: {itemParent}</Text>
           <Text>MIN: {itemNo}</Text>
           <Text>Primary PIN:{route.params.barCode}</Text>
           <>
           {packQuantity!=='NA'?<Text>Pack Quantity: {packQuantity}</Text>:
                        <Text>Pack Quantity: Not available</Text>}
           </>
           <Text>{itemDesc}</Text>
           <Text>{prodData1.trim()} {prodData2.trim()} {prodData3.trim()}</Text>           
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('ProductDetl',{urlData: urlData,isImage:isImage})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.09,height:Dimensions.get('window').height*0.05,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View>
      </View>
      <View style={{width:Dimensions.get('window').width*0.4,height:Dimensions.get('window').height*0.6,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Dimension</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.05}}>
         <Text></Text>
         {packQuantity!=='NA'?<Text>Case Size: {packQuantity}</Text>:
                        <Text>Case Size: Not available</Text>}
         {packNumber!=='NA'?<Text>Pack Number: {packNumber}</Text>:
                        <Text>Pack Number: Not available</Text>}
         <Text>Case Length: {dimLength}</Text>
         <Text>Case Width: {dimWidth}</Text>
         <Text>Case Height: {dimHeight}</Text>
         <Text>Case Weight: {dimWeight}</Text>
         <Text>Case Net Weight: {caseNetWght}</Text>
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Dimension',{isImage:isImage,dimLength: dimLength,dimWidth:dimWidth,dimHeight:dimHeight,dimWeight:dimWeight,caseNetWght:caseNetWght,urlData:urlData})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.021,height:Dimensions.get('window').height*0.05,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      <View style={{width:Dimensions.get('window').width*0.465,height:Dimensions.get('window').height*0.6,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Supplier and Cost Price</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.05}}>
         <Text></Text>
         <Text>Primary Supplier: {supplySource}</Text>
         {rmsRet>=200 && rmsRet<=299?<Text>Supplier Site: {area}</Text>:<Text>Supplier Site: Details can't be fetched RMS server error: {rmsRet}</Text>}
         <Text>Sourcing Country: {originCntry}</Text>
         {priceRet>=200 && priceRet<=299?<Text>Currency: {currency}</Text>:<Text>Currency: Details can't be fetched error: {priceRet}</Text>}
         {priceRet>=200 && priceRet<=299?<Text>Case Cost: {currency+((netCont/1000)*itemCost)} per case</Text>:<Text>Case Cost: Details can't be fetched error: {priceRet}</Text>}
         {priceRet>=200 && priceRet<=299?<Text>Item Cost: {perUnit}</Text>:<Text>Item Cost: Details can't be fetched error: {priceRet}</Text>}
         <Text>Duty : 0</Text>
         <Text>Gross Margin (Excl VAT):</Text>
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('PriceDetl',{rmsRet:rmsRet,priceRet:priceRet,isImage:isImage,urlData:urlData,supplySource:supplySource, area:area, originCntry:originCntry, currency:currency,perUnit:perUnit,caseCost:(currency+((netCont/1000)*itemCost))})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.021,height:Dimensions.get('window').height*0.05,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      <View style={{width:Dimensions.get('window').width*0.465,height:Dimensions.get('window').height*0.6,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Retail Price</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.05}}>
         <Text></Text>
         {priceRet>=200 && priceRet<=299?<Text>Retail Price: {regPrice}</Text>:<Text>Retail Price: Details can't be fetched error: {priceRet}</Text>}
         <Text>Offer: </Text>  
         {priceRet>=200 && priceRet<=299?<Text>Unit Equivalent Price: {perUnit}</Text>:<Text>Unit Equivalent Price: Details can't be fetched error: {priceRet}</Text>}
         <Text>Vat Rate: {vatRate}</Text>
         {priceRet>=200 && priceRet<=299?<Text>Selling Unit of Measure: {uom} per case</Text>:<Text>Selling Unit of Measure: Details can't be fetched error: {priceRet}</Text>}
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('RetailPrice',{rmsRet:rmsRet,priceRet:priceRet,isImage:isImage,urlData: urlData,priceData:priceData})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.021,height:Dimensions.get('window').height*0.05,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      <View style={{width:Dimensions.get('window').width*0.465,height:Dimensions.get('window').height*0.6,marginStart:Dimensions.get('window').width*0.01,borderWidth:2,borderColor:'black',backgroundColor:'white'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold'}}>Inventory</Text>
      <View style={{flexDirection:'row',flex:1}}>
        <View style={{flex:1, marginStart:Dimensions.get('window').width*0.05}}>
         <Text></Text>
         {rmsRet>=200 && rmsRet<=299?<Text>Depot Stock: {depoStock}</Text>:<Text>Depot Stock: Details can't be fetched RMS server error: {rmsRet}</Text>}
         {rmsRet>=200 && rmsRet<=299?<Text>Store Stock: {storeStock}</Text>:<Text>Store Stock: Details can't be fetched RMS server error: {rmsRet}</Text>}
         {rmsRet>=200 && rmsRet<=299?<Text>Total Stock: {totalStock}</Text>:<Text>Total Stock: Details can't be fetched RMS server error: {rmsRet}</Text>}
         <Text></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Inventory',{rmsRet:rmsRet,isImage:isImage,urlData: urlData,depoStock:depoStock,storeStock:storeStock,totalStock:totalStock})}>
          <Image source={require('../images/plus_logo.png')} style={{width:Dimensions.get('window').width*0.021,height:Dimensions.get('window').height*0.05,resizeMode:'contain'}}/>
        </TouchableOpacity>
      </View> 
      </View>
      </View>
      </ScrollView>
      <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>{console.log('Ok');navigation.navigate('ProductMain');}} style={{alignSelf:'flex-end'}}>
            <Image source={require('../images/ok_logo.jpeg')} style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.2,resizeMode:'contain',alignSelf:'flex-end'}}/>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>      
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
  containerLand: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  heading:{
    alignItems: 'flex-end',
  }
});

export default ShowProduct;
