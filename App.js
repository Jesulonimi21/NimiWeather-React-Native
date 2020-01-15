import React,{Component} from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView,Platform,TextInput,ImageBackground,ActivityIndicator,StatusBar} from 'react-native';

import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import {fetchLocationId,fetchWeather} from './utils/api';
export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state={
        location:'',
        loading:false,
        temperature:0,
        weather:'',
        error:false
      }
    }

    componentDidMount(){
this.handleUpdateLocation('San Francisco');
    }
  handleUpdateLocation= async (city)=>{
    if(!city){
      return;
    }
 
  this.setState({loading:true},async()=>{
    try{
    const locationId=await fetchLocationId(city);
    const{location,weather,temperature}=await fetchWeather(locationId);
 

  this.setState({
    loading:false,
    error:false,
    temperature:temperature,
    weather:weather,
    location:location
  });
 } catch(e){
   this.setState({
     loading:false,
     error:true
   })
 } });
  }
render(){
  const {location,loading,error,weather,temperature}=this.state;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle='light-content' />
      <ImageBackground
      style={styles.imageContainer}
      imageStyles={styles.image}
      source={getImageForWeather(weather)}
      >
        <View style={styles.detailsContainer}>
        <ActivityIndicator animating={loading} color="white" size="large" />
          {
            !loading&&(
              <View>
              {error &&(
               
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Cannot load weather, check internet connection or try another city but searching for any capital city should work
                  </Text>
             
                )}
              {!error &&(
                  <View>
                          
      <Text style={[styles.largeText,styles.textStyle]}>{location}</Text>
    <Text style={[styles.smallText,styles.textStyle]}>{weather}</Text>
    <Text style={[styles.largeText,styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>

                  </View>
              )}
              </View> )}
    
    <SearchInput placeholder="Search any city" onSubmit={this.handleUpdateLocation}></SearchInput>
    </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  textStyle:{
    textAlign:'center',
    ...Platform.select({
      ios:{
       fontFamily:'AvenirNext-Regular' 
      },
      android:{
        fontFamily:'Roboto'
      }
    }),
    color:'white'
    
  },
  largeText:{
    fontSize:44
  },
  smallText:{
    fontSize:18
  },
  image:{
    width:null,
    height:null,
    flex:1,
    resizeMode:'cover'
  },
  imageContainer:{
    flex:1
  },
  detailsContainer:{
    justifyContent:'center',
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal:20
  }
});
