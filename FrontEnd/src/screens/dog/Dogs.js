import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/dataContext';
import api from '../../api';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';

const Dogs = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [dogs, setDogs] = useState({});

    useEffect(() => {
        const onScreenLoad = async () => {
            const list = await api.get('/dog/find');
            setDogs(list.data.dogs);
            dispatch({ type: "update", payload: false });
        }
        onScreenLoad();
    }, [state.update]
    )

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

    return (
        <View style={styles.view}>
            {state.isAdmin ? (
                <CustomButton text="Novo Dog" onPress={() => navigation.navigate("RegisterDog")} />
            ) : (
                <></>
            )}
            <CustomButton text="Pesquisar Dog" onPress={() => navigation.navigate("PesquisarDog")} />

            <FlatList
                data={dogs}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.text}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.item}>{item.breed}</Text>
                                <Text style={styles.item}>{item.size}</Text>
                                <Text style={styles.item}>{item.description}</Text>
                                <Text style={styles.item}>{item.cidade}</Text>
                                <Text style={styles.item}>{item.estado}</Text>
                            </TouchableOpacity>
                            <FontAwesome5
                                name="whatsapp"
                                size={60}
                                color="green"
                                style={styles.icon}
                                onPress={() => openWhatsApp(item)}
                                />
                        </View>
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
        </View>

    )
}

export default Dogs;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        marginBottom: 20
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
    },
    title: {
        fontSize: 30
    },
    item: {
        fontSize: 15
    },
    icon: {
        margin: 0
    }
});