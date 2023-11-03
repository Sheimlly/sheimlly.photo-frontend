import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import './resources/styles/global.scss'
import Header from './pages/_partials/header'
import Footer from './pages/_partials/footer'

createRoot(document.getElementById('root')!).render(
  <>
    <Header />
    <Routes />
    <Footer />
  </>
)