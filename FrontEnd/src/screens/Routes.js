import { StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome } from '@expo/vector-icons'

import { Context } from '../context/dataContext'

import Home from './Home'
import DogRoutes from './dog/DogRoutes'
import Users from './Users'
import PesquisarDog from './dog/PesquisarDog'

const Tab = createBottomTabNavigator();

const Routes = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)
    return (
        <Tab.Navigator screenOptions={{
            headerRight: () => (
                <Entypo
                    name='log-out'
                    size={20}
                    style={{ margin: 10 }}
                    onPress={() => dispatch({ type: 'logOut' })}
                    color="#000"
                />
            )
        }} >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='home' size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Dogs"
                component={DogRoutes}
                options={{
                    tabBarIcon: () => (
                        <Entypo name='bowl' size={30} />
                    )
                }}
            />

            <Tab.Screen
                name="Search"
                component={PesquisarDog}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name='search' size={30} />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({})