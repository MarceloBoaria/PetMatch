import React, { useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialState = {
    Loading: true,
    isLogged: false,
    name: '',
    isAdmin: false,
    idUser: '',
    idDog: '',
    nameDog: '',
    breedDog: '',
    sizeDog: '',
    descriptionDog: '',
    cidadeDog: '',
    telefoneDog: '',
    update: false
}

const reducer = (state, action) => {
    switch(action.type){
        case "logIn":
            return { ...state, isLogged: action.payload, Loading: false }
        case "logOut":
            AsyncStorage.removeItem("token");
            return { 
                ...state, 
                isLogged: false,
                isAdmin: false
            }
        case "verify":
            return { 
                ...state, 
                isLogged: true, 
                Loading: false, 
                idUser: action.payload.id, 
                isAdmin: action.payload.admin, 
                name: action.payload.name,
            }
        case "setDog":
            return { 
                ...state, 
                idDog: action.payload.id,
                nameDog: action.payload.name,
                breedDog: action.payload.breed,
                sizeDog: action.payload.size,
                descriptionDog: action.payload.description,
                cidadeDog: action.payload.cidade,
                telefoneDog: action.payload.telefone
            }
        case "update":
            return {
                ...state,
                update: action.payload
            }
        default:
            return state
    }
}

export const Context = React.createContext();

export const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
    
}