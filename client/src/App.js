import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

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
import PurchaseAdd from './components/Purchases/PurchaseAdd'
import PurchaseEdit from './components/Purchases/PurchaseEdit'

import PayablesList from './components/Expenses/PayablesList'
import PayableAdd from './components/Expenses/PayableAdd'
import PayableEdit from './components/Expenses/PayableEdit'

import SalesList from './components/Sales/SalesList'
import SaleAdd from './components/Sales/SaleAdd'
import SaleEdit from './components/Sales/SaleEdit'

import OrdersList from './components/Orders/OrdersList'
import OrderAdd from './components/Orders/OrderAdd'
import OrderEdit from './components/Orders/OrderEdit'

import CashList from './components/Cash/CashList'
import CashAdd from './components/Cash/CashAdd'
import CashEdit from './components/Cash/CashEdit'

import ReportList from './components/Reports/ReportList'
import TeamList from './components/Team/TeamList'


function App() {
  return (
    <BrowserRouter>
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
      <Route path="/businesses/:businessId/invoices/new" component={SaleAdd} />
      <Route path="/businesses/:businessId/invoices/:saleId/edit" component={SaleEdit} />

      <Route path="/businesses/:businessId/purchases" component={PurchaseList} exact/>
      <Route path="/businesses/:businessId/purchases/new" component={PurchaseAdd} exact />
      <Route path="/businesses/:businessId/purchases/:purchaseIdedit" component={PurchaseEdit} />

      <Route path="/businesses/:businessId/orders" component={OrdersList} exact/>
      <Route path="/businesses/:businessId/orders/new" component={OrderAdd} exact />
      <Route path="/businesses/:businessId/orders/:orderId/edit/" component={OrderEdit} />

      <Route path="/businesses/:businessId/expenses" component={PayablesList} exact/>
      <Route path="/businesses/:businessId/expenses/new" component={PayableAdd} exact />
      <Route path="/businesses/:businessId/expenses/:expenseId/edit" component={PayableEdit} />

      <Route path="/businesses/:businessId/cashbook" component={CashList} exact/>
      <Route path="/businesses/:businessId/cashbook/new" component={CashAdd} exact />
      <Route path="/businesses/:businessId/cashbook/:cashbookId/edit" component={CashEdit} />

      <Route path="/businesses/:businessId/reports" component={ReportList} exact/>
      <Route path="/businesses/:businessId/teams" component={TeamList} exact/>

      </Switch>
      </div>
    </MuiPickersUtilsProvider>
    </BrowserRouter>
  )
}

export default App
