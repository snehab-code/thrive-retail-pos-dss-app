import axios from '../config/axios'
import Swal from 'sweetalert2'

const setPayables = (payables) => {
    return {type: 'SET_PAYABLES', payload: payables}
}

const addPayable = (payable) => {
    return {type: 'ADD_PAYABLE', payload: payable}
}

const updatePayable = (id, payable) => {
    return {type: 'UPDATE_PAYABLE', payload: {id, payable}}
}

const removePayable = (id) => {
    return {type: 'REMOVE_PAYABLE', payload: id}
}

export const startGetPayables = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/payables`)
        .then(response => {
            const payables = response.data
            dispatch(setPayables(payables))
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostPayable = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/payables`, formData)
            .then(response => {
                console.log(response)
                const payable = response.data
                dispatch(addPayable(payable))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutPayable = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/payables/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const payable = response.data
                const id = payable._id
                dispatch(updatePayable(id, payable))
                history && history.push(`/businesses/${businessId}/payables/${id}`)
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

export const startDeletePayable = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/payables/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removePayable(id))
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