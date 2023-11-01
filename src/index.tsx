import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import './resources/styles/global.scss'

createRoot(document.getElementById('root')!).render(<Routes />)