import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import './resources/styles/global.scss'
import Header from './pages/partials/header'
import Footer from './pages/partials/footer'

createRoot(document.getElementById('root')!).render(
  <>
    <Header />
    <Routes />
    <Footer />
  </>
)