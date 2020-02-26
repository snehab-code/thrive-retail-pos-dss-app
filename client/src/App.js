import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './components/statics/Header'
import Home from './components/statics/Home'

import Login from './components/User/Login'
import Register from './components/User/Register'

import './App.css'


function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header/>
      
      <div className="appContent">
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  )
}

export default App
