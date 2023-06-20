import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterDog from './RegisterDog';
import Dogs from './Dogs';
import PesquisarDog from './PesquisarDog';
import EditDog from './EditDog';

const Stack = createNativeStackNavigator();

const DogRoutes = ({ navigation }) => {
    
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="MainDogs" component={Dogs} />
                <Stack.Screen name="RegisterDog" component={RegisterDog} />
                <Stack.Screen name="PesquisarDog" component={PesquisarDog} />
                <Stack.Screen name="EditDog" component={EditDog} />
            </Stack.Navigator>
    )
}

export default DogRoutes;