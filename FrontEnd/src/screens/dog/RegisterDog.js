import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useState, useContext } from 'react';
import Logo from '../../assets/images/logo-cao.png';
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
    const [estado, setEstado] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/dog/register", {
                name: name,
                breed: breed,
                size: size,
                description: description,
                cidade: cidade,
                estado: estado
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setName("")
                setBreed("")
                setSize("")
                setDescription("")
                setCidade("")
                setEstado("")
                dispatch({ type: "update", payload: true })
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
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <CustomInput
                placeholder="Dog Name"
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
                placeholder="Description"
                value={description}
                setValue={setDescription}
            />

            <CustomInput
                placeholder="City"
                value={cidade}
                setValue={setCidade}
            />

            <CustomInput
                placeholder="State"
                value={estado}
                setValue={setEstado}
            />

            <CustomButton text="Register" onPress={onRegisterPressed} />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
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

export default RegisterDog;