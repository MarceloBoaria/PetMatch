import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/dataContext';
import api from '../../api';
import { Entypo } from '@expo/vector-icons';
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

    const seeMatch = async (item) => {
        await dispatch({ type: 'setDog', payload: item });
        navigation.navigate('DogMatchs');
    }

    const newMatch = async (item) => {
        await dispatch({ type: 'setDog', payload: item });
        navigation.navigate('RegisterMatch');
    }

    return (
        <View style={styles.view}>
            {state.isAdmin ? (
                <CustomButton text="Novo Dog" onPress={() => navigation.navigate("RegisterDog")} />
            ) : (
                <></>
            )}
            <FlatList
                data={dogs}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.text} onPress={() => seeMatch(item)}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.item}>{item.type}</Text>
                                <Text style={styles.item}>{item.description}</Text>
                                <Text style={styles.item}>{item.address}</Text>
                            </TouchableOpacity>
                            <Entypo
                                name="squared-plus"
                                size={60}
                                color="green"
                                style={styles.icon}
                                onPress={() => newMatch(item)}
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