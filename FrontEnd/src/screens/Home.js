import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { Context } from '../context/dataContext'
import CustomButton from '../components/CustomButton';

const Home = ({ navigation }) => {

  const { state, dispatch } = useContext(Context);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Bem-vindo(a), {state.name}.</Text> 
      <Text style={styles.paragraph}><Text style={styles.negrito}>O PetMatch</Text> é um aplicativo que conecta pessoas que desejam adotar um animal de estimação com animais disponíveis para adoção.</Text>

      <Text style={styles.paragraph}>Nossa plataforma oferece uma <Text style={styles.negrito}>variedade de dogs</Text>, todos querendo um lar.</Text>
      
      <Text style={styles.paragraph}>Com o PetMatch, você pode encontrar seu novo amigo peludo, <Text style={styles.negrito}>obter informações detalhadas sobre eles e entrar em contato direto</Text> com os abrigos ou protetores.</Text>

      <CustomButton text="Dogs" onPress={() => navigation.navigate("Dogs")} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'space-around',
    backgroundColor: "#c2deff"
  },
  text: {
    fontSize: 30,
    margin: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    width: "100%",
    textAlign: "center",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    fontSize: '1rem'
  },
  negrito: {
    fontWeight: "bold"
  }
})

export default Home;