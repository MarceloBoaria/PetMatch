import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useContext } from 'react';
import CustomButton from "../../components/CustomButton";
import api from '../../api';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import { Context } from "../../context/dataContext";
import { Linking } from "react-native";

const PesquisarDog = ({ navigation }) => {

    
    const { state, dispatch } = useContext(Context);

    const [breed, setBreed] = useState('');
    const [teste, setTeste] = useState([])

    

    const onSearchPressed = async () => {

        try {

            const PesquisarDog = await api.post("/dog/findAdvanced", {
                breed: breed
            });
            if (PesquisarDog.status === 200) {
                console.log(PesquisarDog.data.dogs)
                setTeste(PesquisarDog.data.dogs)
            }
            else {

                console.log(PesquisarDog.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const openWhatsApp = (item) => {
        // Verifica se o aplicativo do WhatsApp está instalado no dispositivo
        Linking.canOpenURL('whatsapp://send').then(supported => {
            if (supported) {
                // Abre o link para o WhatsApp
                return Linking.openURL('http://wa.me/+55' + item.telefone);
            } else {
                console.log("O aplicativo do WhatsApp não está instalado");
            }
        }).catch(err => console.error('Erro ao verificar o WhatsApp:', err));
    };

    const editDog = async (item) => {
        await dispatch({ type: "setDog", payload: item })
        navigation.navigate('EditDog')
    }

    const deleteDog = async (item) => {
        // como fazer um poupup de confirmação, sim ou não!
        await api.post('/dog/delete',{
            id: item.id
        })
        dispatch({ type: "update", payload: true });
        navigation.navigate('Home')
    }

    return (
        <View style={styles.view}>

            <Picker
                selectedValue={breed}
                style={styles.picker}
                onValueChange={setBreed}>
                <Picker.Item label="Todos" value="" />
                <Picker.Item label="Vira-Lata" value="Vira-Lata" />
                <Picker.Item label="Pug" value="Pug" />
                <Picker.Item label="Border-Collie" value="Border-Collie" />
                <Picker.Item label="Pastor-Alemão" value="Pastor-Alemão" />
                <Picker.Item label="Rottweiler" value="Rottweiler" />
                <Picker.Item label="Shih-Tzu" value="Shih-Tzu" />
                <Picker.Item label="Bulldog-Frânces" value="Bulldog-Frânces" />
                <Picker.Item label="Golden-Retriever" value="Golden-Retriever" />
                <Picker.Item label="Yorkshire-Terrier" value="Yorkshire-Terrier" />
                <Picker.Item label="Poodle" value="Poodle" />
            </Picker>

            <CustomButton text="Pesquisar" onPress={onSearchPressed} />

            <FlatList
                data={teste}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <View style={styles.text}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.item}>{item.breed}</Text>
                                <Text style={styles.item}>{item.size}</Text>
                                <Text style={styles.item}>{item.description}</Text>
                                <Text style={styles.item}>{item.cidade}</Text>
                                <Text style={styles.item}>{item.estado}</Text>
                            </View>
                            <View style={styles.icones}>
                                <FontAwesome
                                    name="whatsapp"
                                    size={40}
                                    color="green"
                                    style={styles.icon}
                                    onPress={() => openWhatsApp(item)}
                                />
                                <FontAwesome
                                    name="edit"
                                    size={40}
                                    color="green"
                                    style={styles.icon}
                                    onPress={() => editDog(item)}
                                />
                                <FontAwesome
                                    name="trash-o"
                                    size={40}
                                    color="green"
                                    style={styles.icon}
                                    onPress={() => deleteDog(item)}
                                />
                                </View>
                        </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        alignItems: 'center'
    },
    text: {
        height: 120,
        width: '80%',
        justifyContent: "center",
        padding: 20
    },
    title: {
        fontSize: 40,
        marginVertical: 10
    },
    item: {
        fontSize: 20
    },
    icones: {
        flexDirection: "column",
        alignItems: "center"
    },
    icon: {
        margin: 0,
        paddingVertical: 8
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
    picker: {
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        borderWidth: 0,
        height: 45,
        width: '100%'
    }
});

export default PesquisarDog;