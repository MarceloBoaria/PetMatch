import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterDog from './RegisterDog';
import Dogs from './Dogs';
import RegisterMatch from '../match/RegisterMatch';
import RestaurantMatchs from '../match/RestaurantMatchs';

const Stack = createNativeStackNavigator();

const DogRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="MainDogs" component={Dogs} />
                <Stack.Screen name="RegisterDog" component={RegisterDog} />
                <Stack.Screen name="RegisterMatch" component={RegisterMatch} />
                <Stack.Screen name="DogMatchs" component={DogMatchs} />
            </Stack.Navigator>
    )
}

export default DogRoutes;