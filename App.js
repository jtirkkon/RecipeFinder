import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  
const findRecipes = () => {
    const url = `http://www.recipepuppy.com/api/?i=${ingredient}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.results);
        let tempArray = [...data.results];
        
        //If thumbnail picture is missing, set general picture for thumbnail
        tempArray.forEach((element, index) => {
          if (element.thumbnail == '') {
            tempArray[index].thumbnail = 'http://img.recipepuppy.com/757977.jpg';
          }
        });
        setRecipes(tempArray);
        //console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1, 
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      /> 
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data = {recipes}
        renderItem = {({item}) => 
          <View>
            <Text>{item.title}</Text>
            <Image source={{ uri: `${item.thumbnail}` }}
            style={{ width: 60, height: 60 }} />
          </View>}
        keyExtractor={item => `${item.title}${item.thumbnail}`}
        ItemSeparatorComponent = {listSeparator}
      />

      <TextInput style={styles.textInputStyle} onChangeText={text => setIngredient(text)} value={ingredient}
      placeholder='Write ingredients separated by comma'></TextInput>
      <Button title="FIND" onPress={findRecipes}></Button>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 30
  },
  textInputStyle: {
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20
  },
});






