import axios from '../config/axios'
import Swal from 'sweetalert2'
import {startGetCashBank} from './cashBank'
import {startGetClients} from './clients'
import {startGetCommodities} from './commodities'
import {startGetCreditors} from './creditors'
import {startGetPayables} from './payables'
import {startGetPurchaseOrders} from './purchaseOrders'
import {startGetSuppliers} from './suppliers'
import {startGetTransactions} from './transactions'

const setBusinesses = (businesses) => {
    return {type: 'SET_BUSINESSES', payload: businesses}
}

const addBusiness = (business) => {
    return {type: 'ADD_BUSINESS', payload: business}
}

const updateBusiness = (id, business) => {
    return {type: 'UPDATE_BUSINESS', payload: {id, business}}
}

const removeBusiness = (id) => {
    return {type: 'REMOVE_BUSINESS', payload: id}
}

export const startGetBusinessInfo = (businessId) => {
    return (dispatch) => {
        dispatch(startGetCashBank(businessId))
        dispatch(startGetClients(businessId))
        dispatch(startGetCommodities(businessId))
        dispatch(startGetCreditors(businessId))
        dispatch(startGetPayables(businessId))
        dispatch(startGetPurchaseOrders(businessId))
        dispatch(startGetSuppliers(businessId))
        dispatch(startGetTransactions(businessId))
    }
}

export const startGetBusinesses = () => {
    return (dispatch) => {
        axios.get(`/businesses`)
        .then(response => {
            const businesses = response.data
            dispatch(setBusinesses(businesses))
        })
        .catch(err => {
            if (err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostBusiness = (formData) => {
    return (dispatch) => {
        axios.post('/businesses', formData)
        .then(response => {
            console.log(response)
            const business = response.data
            dispatch(addBusiness(business))
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                text: err
            })
        })
    }
}

export const startPutBusiness = (id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const business = response.data
                const id = business._id
                dispatch(updateBusiness(id, business))
                history && history.push(`/businesses/${id}`)
            }
        })
        .catch(err => {
            if (err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
                footer: 'Please try again'
              })
            history.push('/account/login')
        })
    }
} 

export const startDeleteBusiness = (id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${id}`)
        .then(response => {
            const id = response.data._id
            dispatch(removeBusiness(id))
        })
        .catch(err => {
            if (err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was an error while deleting your business',
                footer: 'Please try again'
                })
        })
    }
}

export const startPostJoin = (id, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${id}/invites/acceptance`, formData)
        .then(response => {
            !response.data.notice && dispatch(addBusiness(response.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}