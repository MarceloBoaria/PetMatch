import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useState, useContext } from 'react';
import DogAdd from '../../assets/images/dog-add.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import api from '../../api';
import { Context } from '../../context/dataContext';
import { Picker } from '@react-native-picker/picker';

const RegisterDog = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [cidade, setCidade] = useState('');
    const [telefone, setTelefone] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/dog/register", {
                name: name,
                breed: breed,
                size: size,
                description: description,
                cidade: cidade,
                telefone: telefone
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setName("")
                setBreed("")
                setSize("")
                setDescription("")
                setCidade("")
                setTelefone("")
                dispatch({ type: "update", payload: true })
                navigation.navigate("MainDogs")
            }
            else {

                console.log(authData.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.view}>
            <Image
                source={DogAdd}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <CustomInput
                placeholder="Nome"
                value={name}
                setValue={setName}
            />

            <Picker
                selectedValue={breed}
                style={styles.picker}
                onValueChange={setBreed}
            >
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

            <CustomInput
                placeholder="Descrição (Porte, Vacinação, Castração)"
                value={description}
                setValue={setDescription}
            />

            <CustomInput
                placeholder="Cidade"
                value={cidade}
                setValue={setCidade}
            />

            <CustomInput
                placeholder="Telefone"
                value={telefone}
                setValue={setTelefone}
            />

            <CustomButton text="Register" onPress={onRegisterPressed} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#c2deff"
    },
    logo: {
        width: '40%',
        maxWidth: 100,
        maxHeight: 170,
    },
    loginText: {
        fontWeight: "bold",
        color: "#6200ee",
    },
    picker: {
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        height: 45,
        width: '100%'
    }
});

export default RegisterDog;