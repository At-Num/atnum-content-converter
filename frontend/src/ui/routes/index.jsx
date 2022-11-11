import React, { useEffect, useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainContainer } from "../containers/main"
import { LogWarning } from '../../../wailsjs/runtime/runtime'
import {Store, ACTIONS} from '../../dispatch'


export const Routing = () => {
    const [store, dispatch] = useContext(Store);
 
    useEffect(() => { 
        // ClientIsInit().then((ret) => {
        //     LogWarning(`Routing constructor client has provider ${ret}`)
        //     dispatch({
        //         type: ACTIONS.IS_INIT,
        //         value: ret,
        //       });
        // })
    // check we have a client  ClientIsInit 
    LogWarning(`Routing constructor`)
    },[])

    return (
        <Routes>
            <Route path="/" element={<MainContainer />} >
            </Route>
        </Routes>
    )
}