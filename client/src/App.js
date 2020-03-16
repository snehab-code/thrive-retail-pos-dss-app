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
import PurchaseShow from './components/Purchases/PurchaseShow'
import PurchaseAdd from './components/Purchases/PurchaseAdd'
import PurchaseEdit from './components/Purchases/PurchaseEdit'

import PayablesList from './components/Expenses/PayablesList'
import PayableShow from './components/Expenses/PayableShow'
import PayableAdd from './components/Expenses/PayableAdd'
import PayableEdit from './components/Expenses/PayableEdit'

import SalesList from './components/Sales/SalesList'
import SaleShow from './components/Sales/SaleShow'
import SaleAdd from './components/Sales/SaleAdd'
import SaleEdit from './components/Sales/SaleEdit'

import OrdersList from './components/Orders/OrdersList'
import OrderShow from './components/Orders/OrderShow'
import OrderAdd from './components/Orders/OrderAdd'
import OrderEdit from './components/Orders/OrderEdit'

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
      <Route path="/businesses/:businessId/invoices/new" component={SaleAdd} />
      <Route path="/businesses/:businessId/invoices/edit" component={SaleEdit} />
      <Route path="/businesses/:businessId/invoices/:invoiceId" component={SaleShow}/>

      <Route path="/businesses/:businessId/purchases" component={PurchaseList} exact/>
      <Route path="/businesses/:businessId/purchases/new" component={PurchaseShow} exact />
      <Route path="/businesses/:businessId/purchases/edit" component={PurchaseEdit} />
      <Route path="/businesses/:businessId/purchases/:purchaseId" component={PurchaseShow}/>

      <Route path="/businesses/:businessId/orders" component={OrdersList} exact/>
      <Route path="/businesses/:businessId/orders/new" component={OrderShow} exact />
      <Route path="/businesses/:businessId/orders/edit" component={OrderEdit} />
      <Route path="/businesses/:businessId/orders/:orderId" component={OrderShow}/>

      <Route path="/businesses/:businessId/expenses" component={PayablesList} exact/>
      <Route path="/businesses/:businessId/expenses/new" component={PayableShow} exact />
      <Route path="/businesses/:businessId/expenses/edit" component={PayableEdit} />
      <Route path="/businesses/:businessId/expenses/:expenseId" component={PayableShow}/>

      <Route path="/businesses/:businessId/reports" component={ReportList} exact/>
      <Route path="/businesses/:businessId/teams" component={TeamList} exact/>

      </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
