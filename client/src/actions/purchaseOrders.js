import axios from '../config/axios'
import Swal from 'sweetalert2'

const setPurchaseOrders = (purchaseOrders) => {
    return {type: 'SET_PURCHASEORDERS', payload: purchaseOrders}
}

const addPurchaseOrder = (purchaseOrder) => {
    return {type: 'ADD_PURCHASEORDER', payload: purchaseOrder}
}

const updatePurchaseOrder = (id, purchaseOrder) => {
    return {type: 'UPDATE_PURCHASEORDER', payload: {id, purchaseOrder}}
}

const removePurchaseOrder = (id) => {
    return {type: 'REMOVE_PURCHASEORDER', payload: id}
}

export const startGetPurchaseOrders = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/purchase-orders`)
        .then(response => {
            const purchaseOrders = response.data
            dispatch(setPurchaseOrders(purchaseOrders))
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostPurchaseOrder = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/purchase-orders`, formData)
            .then(response => {
                console.log(response)
                const purchaseOrder = response.data
                dispatch(addPurchaseOrder(purchaseOrder))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutPurchaseOrder = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/purchase-orders/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const purchaseOrder = response.data
                const id = purchaseOrder._id
                dispatch(updatePurchaseOrder(id, purchaseOrder))
                history && history.push(`/businesses/${businessId}/purchase-orders/${id}`)
            }
        })
        .catch(err => {
            if (err.response.status === 401) {
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

export const startDeletePurchaseOrder = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/purchase-orders/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removePurchaseOrder(id))
            })
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch({type: 'LOGOUT'})
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your transaction',
                    footer: 'Please try again'
                  })
            })
    }
}