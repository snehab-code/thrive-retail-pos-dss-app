import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {BrowserRouter} from 'react-router-dom'
import Header from './components/statics/Header'
import Home from './components/statics/Home'
import './App.css'
import Footer from './components/statics/Footer'


function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header/>
      <Home />
      <Footer />
    </BrowserRouter>
  )
}

export default App
