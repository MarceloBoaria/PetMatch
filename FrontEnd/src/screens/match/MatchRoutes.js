import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterMatch from './RegisterMatch';
import Matchs from './Matchs';

const Stack = createNativeStackNavigator();

const MatchRoutes = ({ navigation }) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="MatchsMain" component={Matchs} />
            </Stack.Navigator>
    )
}

export default MatchRoutes;