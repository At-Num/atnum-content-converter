import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Routing } from './ui/routes/index'
import { MemoryRouter } from "react-router-dom";
import { StoreContextProvider } from './dispatch';

const container = document.getElementById('root')

const root = createRoot(container)
 

root.render(
    <MemoryRouter>
        <StoreContextProvider>
            <Routing />
        </StoreContextProvider>
    </MemoryRouter>
)
