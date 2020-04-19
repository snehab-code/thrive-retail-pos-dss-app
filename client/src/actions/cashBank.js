import axios from '../config/axios'
import Swal from 'sweetalert2'

const setCashBank = (cashBank) => {
    return {type: 'SET_CASHBANK', payload: cashBank}
}

const addCashBank = (cashBank) => {
    return {type: 'ADD_CASHBANK', payload: cashBank}
}

const updateCashBank = (id, cashBank) => {
    return {type: 'UPDATE_CASHBANK', payload: {id, cashBank}}
}

const removeCashBank = (id) => {
    return {type: 'REMOVE_CASHBANK', payload: id}
}

export const startGetCashBank = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/cash-bank`)
        .then(response => {
            const cashBank = response.data
            dispatch(setCashBank(cashBank))
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostCashBank = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/cash-bank`, formData)
            .then(response => {
                console.log(response)
                const cashBank = response.data
                dispatch(addCashBank(cashBank))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutCashBank = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/cash-bank/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const cashBank = response.data
                const id = cashBank._id
                dispatch(updateCashBank(id, cashBank))
                history && history.push(`/businesses/${businessId}/cash-bank/${id}`)
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

export const startDeleteCashBank = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/cash-bank/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeCashBank(id))
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