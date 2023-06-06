import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useState, useContext } from 'react';
import Logo from '../../assets/images/logo.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import api from '../../api';
import { Context } from '../../context/dataContext';
import { Picker } from '@react-native-picker/picker';

const RegisterDog = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        try {
            const authData = await api.post("/dog/register", {
                name: name,
                type: type,
                description: description,
                address: address,
            });
            if (authData.status === 200) {
                alert(authData.data.message)
                setName("")
                setType("")
                setDescription("")
                setAddress("")
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
                selectedValue={type}
                style={styles.picker}
                onValueChange={setType}
            >
                <Picker.Item label="FastFood" value="FastFood" />
                <Picker.Item label="Japanese" value="Japanese" />
                <Picker.Item label="Italian" value="Italian" />
                <Picker.Item label="French" value="French" />
                <Picker.Item label="Vegan" value="Vegan" />
                <Picker.Item label="Brazilian" value="Brazilian" />
                <Picker.Item label="Chinese" value="Chinese" />
                <Picker.Item label="Barbecue" value="Barbecue" />
                <Picker.Item label="Mexican" value="Mexican" />
                <Picker.Item label="Hawaiian" value="Hawaiian" />
            </Picker>

            <CustomInput
                placeholder="Description"
                value={description}
                setValue={setDescription}
            />

            <CustomInput
                placeholder="Address"
                value={address}
                setValue={setAddress}
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