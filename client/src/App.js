import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/statics/Header'
import Home from './components/statics/Home'

import './App.css'

import Login from './components/User/Login'
import Register from './components/User/Register'
import BusinessLanding from './components/Admin/BusinessLanding'
import BusinessNew from './components/Admin/BusinessNew'
import BusinessHome from './components/Admin/BusinessHome'


function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header/>
      
      <div className="appContent">
      
      <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/businesses" component={BusinessLanding} exact/>
      <Route path="/businesses/new" component={BusinessNew} exact/>
      <Route path="/businesses/:businessId" component={BusinessHome} />
      </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
