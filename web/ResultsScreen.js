import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from "react";
import { Linking } from 'react-native';

const ResultsScreen = () => {

  const [resultList,setResultList] = useState([]);
  const [query,setQuery] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(()=>{
    getResults()
  },
  [query]);

  function changeQuery () {

    setQuery(userInput);
    console.log(query);
  }

  return(
    <View style={styles.mainView}>
  
    <View style={styles.header}>
      <Text style={styles.headerText}>Will We Ever Find The Answer?</Text>
    </View>

    <View style={styles.body}>

      <View style={styles.container1}>
        <Text style={styles.name}>Findex</Text>
        <TextInput style={styles.textInput} placeholder='Type' onChangeText= {(newUserInput) => setUserInput(newUserInput)}
         onKeyPress={(e) => checkEnter(e)}/>
        <TouchableOpacity style={styles.searchButton} onPress={changeQuery}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

        {resultList.map(result => ( 
          <View style={styles.resultsContainer} key={result.formattedUrl} >
            <Text style={styles.links} onPress={() => Linking.openURL(result.formattedUrl)}>{result.formattedUrl}</Text>
            <Text style={styles.snippetText}>{result.snippet}</Text>
            <br/>
          </View>
        ))}
      </View>


    </View>
  );
  function checkEnter(e){
    if(e.key === "Enter"){
      changeQuery();
    }
  }
  async function getResults() {
    
    const {request} = require('gaxios');

    const rs = await request({
      url:`https://www.googleapis.com/customsearch/v1?key=AIzaSyDsauZHWVq0EEjNJtn6EMLDWeCxPP7V-T8&cx=8496cb49c4b094e5c&q=${query}`
    })
    const result = rs.data.items;
    setResultList(result);
    console.log(result);
  }
}

export default ResultsScreen

const styles = StyleSheet.create({
  mainView:{
    width:'100%',
    height:'100%',
    backgroundColor:'#252428',
  },

  header:{
    width:'100%',
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black'
  },
  headerText:{
      fontSize:'200%',
      color:'white',
      fontStyle:'italic',
      fontFamily:'CedarvilleCursive-Regular',
  },  
  body:{
    width:'100%',
    height:'80%',
    alignItems:'center', 
    WebkitTransform:'',   
  },

  footer:{
    width:'100%',
    height:'10%',
    backgroundColor:'black',
    
  },
  footerText:{
    paddingBottom:'1%',
    textDecorationLine:'underline',
    fontSize:'120%',
    color:'white',
  },
  container1:{
    marginTop:'3%',
    width:'100%',
    height:'35%',
    alignItems:'center',
    justifyContent:'space-around',
    marginBottom:'5%',
  },
  name:{
    fontSize:'600%',
    fontWeight:'bold',
    color:'#42ddf5',
    fontFamily:'CedarvilleCursive-Regular',
    
  },
  textInput:{
    height:'18%',
    width:'40%',
    color:'white',
    borderColor:'white',
    borderWidth:'2px',
    borderRadius:20,
    paddingHorizontal:'2%',
    fontSize:'120%',
  },
  searchButton:{
    backgroundColor:'white',
    width:'15%',
    height:'15%',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    marginTop:'1%',   
  },
  searchButtonText:{
    color:'black',
    textAlign:'center', 
    fontSize:'90%',
    fontWeight:'bold',

  },
  resultsContainer:{
    width:'100%',
    height:'10%',
    backgroundColor:'#252428',
    paddingLeft:'10%',
    paddingBottom:'6%',
  },
  links:{
    fontSize:'150%',
    color:'#42ddf5',
  },
  snippetText:{
    color:'white',
    fontSize:'100%',
  },

})