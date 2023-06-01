import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context/dataContext'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons'

import Home from './Home'
import Dogs from './Dogs'
import Matchs from './Matchs'

const Tab = createBottomTabNavigator();

const Routes = ({navigation}) => {
    const { state, dispatch } = useContext(Context)
    return (
        <Tab.Navigator screenOptions={{
            headerRight: () => (
                <Entypo
                    name='log-out'
                    sizw={20}
                    style={{ margin: 10 }}
                    color='#000'
                    onPress={() => dispatch({type: 'logOut'})}
                />
            )
        }}>

        <Tab.Screen
            name='Home'
            component={Home}
            options={{
                tabBarIcon: () => (
                    <Entypo name='home' size={30} />
                )
            }}
        />

        <Tab.Screen
            name='Dogs'
            component={Dogs}
            options={{
                tabBarIcon: () => (
                    <FontAwesome5 name='dog' size={30} />
                )
            }}
        />
        
        <Tab.Screen
            name='Matchs'
            component={Matchs}
            options={{
                tabBarIcon: () => (
                    <AntDesign name='like1' size={30} />
                )
            }}
        />

        </Tab.Navigator>
  )
}

export default Routes

const styles = StyleSheet.create({})