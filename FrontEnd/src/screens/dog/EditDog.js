import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import React, { useState, useContext } from 'react';
import EditPaw from '../../assets/images/dog-edit.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import api from '../../api';
import { Context } from '../../context/dataContext';
import { Picker } from '@react-native-picker/picker';

const EditDog = ({ navigation }) => {

    const { state, dispatch } = useContext(Context);

    const [name, setName] = useState(state.nameDog);
    const [breed, setBreed] = useState(state.breedDog);
    const [size, setSize] = useState(state.sizeDog);
    const [description, setDescription] = useState(state.descriptionDog);
    const [cidade, setCidade] = useState(state.cidadeDog);
    const [telefone, setTelefone] = useState(state.telefoneDog);

    const { height } = useWindowDimensions();

    const onEditPressed = async () => {
        try {
            const authData = await api.post("/dog/edit", {
                id: state.idDog,
                name: name,
                breed: breed,
                size: size,
                description: description,
                cidade: cidade,
                telefone: telefone
            });
            if (authData.status === 200) {
                alert("Registro alterado com sucesso!")
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
                source={EditPaw}
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
                placeholder="Descrição"
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

            <CustomButton text="Editar" onPress={onEditPressed} />
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
        borderWidth: 1,
        borderColor: '#000000',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        height: 45,
        width: '100%'
    }
});

export default EditDog;