import axios from '../config/axios'
import Swal from 'sweetalert2'

const setOrders = (orders) => {
    return {type: 'SET_ORDERS', payload: orders}
}

const addOrder = (order) => {
    return {type: 'ADD_ORDER', payload: order}
}

const updateOrder = (id, order) => {
    return {type: 'UPDATE_ORDER', payload: {id, order}}
}

const removeOrder = (id) => {
    return {type: 'REMOVE_ORDER', payload: id}
}

export const startGetOrders = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/orders`)
        .then(response => {
            const orders = response.data
            dispatch(setOrders(orders))
        })
        .catch(err => {
            if (err.response && err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostOrder = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/orders`, formData)
            .then(response => {
                console.log(response)
                const order = response.data
                dispatch(addOrder(order))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutOrder = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/orders/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const order = response.data
                const id = order._id
                dispatch(updateOrder(id, order))
                history && history.push(`/businesses/${businessId}/orders/${id}`)
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

export const startDeleteOrder = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/orders/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeOrder(id))
            })
            .catch(err => {
                if (err.response.status == 401) {
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