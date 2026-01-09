import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {AppRoutes} from "./AppRoutes";
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
        <div
            style={{
                backgroundColor: '#FFF44F',
                minHeight: '100vh',       // Обеспечивает 100% высоты экрана
                width: '100%',            // Полная ширина
                margin: 0,                // Без отступов
                padding: 0,
            }}
        >
            <AppRoutes />
        </div>
        </HashRouter>
    </React.StrictMode>
)