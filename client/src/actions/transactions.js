import axios from '../config/axios'
import Swal from 'sweetalert2'

const setTransactions = (transactions) => {
    return {type: 'SET_TRANSACTIONS', payload: transactions}
}

const addTransaction = (transaction) => {
    return {type: 'ADD_TRANSACTION', payload: transaction}
}

const updateTransaction = (id, transaction) => {
    return {type: 'UPDATE_TRANSACTION', payload: {id, transaction}}
}

const removeTransaction = (id) => {
    return {type: 'REMOVE_TRANSACTION', payload: id}
}

export const startGetTransactions = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/transactions`)
        .then(response => {
            const transactions = response.data
            dispatch(setTransactions(transactions))
        })
        .catch(err => {
            if (err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostTransaction = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/transactions`, formData)
            .then(response => {
                console.log(response)
                const transaction = response.data
                dispatch(addTransaction(transaction))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutTransaction = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/transactions/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const transaction = response.data
                const id = transaction._id
                dispatch(updateTransaction(id, transaction))
                history && history.push(`/businesses/${businessId}/transactions/${id}`)
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

export const startDeleteTransaction = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/transactions/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeTransaction(id))
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