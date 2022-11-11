import React, { createContext, useReducer } from 'react';

const initialState = {};
export const Store = createContext(initialState);

export const ACTIONS = {
    IS_INIT: `isInit`
}

const INITIAL_STATE = {
    isInit: false
}

const reducer = (state, action) => {  
    switch (action.type) { 
        case ACTIONS.IS_INIT: {
            return {
                ...state,
                isInit: action.value
            }
        }  

        default:
            throw new Error();
    }
}

export const StoreContextProvider = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Store.Provider value={[state, dispatch]}>
            {props.children}
        </Store.Provider>
    );
}