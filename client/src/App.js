import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/statics/Header'
import Home from './components/statics/Home'

import './config/dataTableTheme'
import './App.css'

import Login from './components/User/Login'
import Register from './components/User/Register'
import BusinessLanding from './components/Admin/BusinessLanding'
import BusinessNew from './components/Admin/BusinessNew'
import BusinessHome from './components/Admin/BusinessHome'
import BusinessAdd from './components/Admin/BusinessAdd'

import PurchaseList from './components/Purchases/PurchaseList'
import PayablesList from './components/Expenses/PayablesList'
import SalesList from './components/Sales/SalesList'
import ReportList from './components/Reports/ReportList'
import TeamList from './components/Team/TeamList'


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
      <Route path="/businesses/add" component={BusinessAdd} exact />
      <Route path="/businesses/:businessId" component={BusinessHome} exact/>
      <Route path="/businesses/:businessId/invoices" component={SalesList} exact />
      <Route path="/businesses/:businessId/purchases" component={PurchaseList} exact/>
      <Route path="/businesses/:businessId/expenses" component={PayablesList} exact/>
      <Route path="/businesses/:businessId/reports" component={ReportList} exact/>
      <Route path="/businesses/:businessId/teams" component={TeamList} exact/>
      </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
