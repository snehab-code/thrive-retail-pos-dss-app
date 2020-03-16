import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import businessesReducer from '../reducers/businessesReducer'
import cashBankReducer from '../reducers/cashBankReducer'
import clientsReducer from '../reducers/clientsReducer'
import commoditiesReducer from '../reducers/commoditiesReducer'
import creditorsReducer from '../reducers/creditorsReducer'
import payablesReducer from '../reducers/payablesReducer'
import purchaseOrdersReducer from '../reducers/purchaseOrdersReducer'
import suppliersReducer from '../reducers/suppliersReducer'
import transactionsReducer from '../reducers/transactionsReducer'
import salesReducer from '../reducers/salesReducer'
import purchasesReducer from '../reducers/purchasesReducer'

const appReducer = combineReducers({
    user: userReducer,
    businesses: businessesReducer,
    cashbank: cashBankReducer,
    clients: clientsReducer,
    commodities: commoditiesReducer,
    creditors: creditorsReducer,
    payables: payablesReducer,
    purchaseOrders: purchaseOrdersReducer,
    suppliers: suppliersReducer,
    transactions: transactionsReducer,
    sales: salesReducer,
    purchases: purchasesReducer
})

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}

const preloadedState = {
    user: {
        isLoaded: false
    }
}

const configureStore = () => {
    const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))
    return store
}

export default configureStore