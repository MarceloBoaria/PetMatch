import {
    StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity
} from "react-native";
import React, { useState } from 'react';
import Pata from '../assets/images/pata.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import api from "../api";

const RegisterUser = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState('');
    const { height } = useWindowDimensions();

    const onRegisterPressed = async () => {
        
            try {
                const data = await api.post('/user/register', {
                    name: name,
                    email: email,
                    password: password,
                    admin: admin
                });
                if (data.status === 200) {
                    console.log(data)
                    alert(data.data.message)
                    navigation.navigate('Login')
                } else {
                    console.log(data)
                }
            } catch (error) {
                console.log(error);
            }

    }

    return (
        <View style={styles.view}>
            <Text style={styles.title}>Você está a um passo de conhecer seu próximo Aumigo!</Text>
            <Image
                source={Pata}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />
            <CustomInput
                placeholder="Name"
                value={name}
                setValue={setName}
            />
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomInput
                placeholder="Admin"
                value={admin}
                setValue={setAdmin}
            />
            <CustomButton text="Cadastrar" onPress={onRegisterPressed} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text>
                    Já tem uma conta?{" "}
                    <Text style={styles.loginText}>Faça o login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({

    view: {
        alignItems: 'center',
        padding: 20,
        flex: 1,
        backgroundColor: "#f5d1b2"
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
    title: {
        fontWeight: "bold",
        fontSize: "1.4rem",
        width: "100%",
        textAlign: "center"
    }
});

export default RegisterUser;