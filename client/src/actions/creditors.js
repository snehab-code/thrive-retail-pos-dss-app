import axios from '../config/axios'
import Swal from 'sweetalert2'

const setCreditors = (creditors) => {
    return {type: 'SET_CREDITORS', payload: creditors}
}

const addCreditor = (creditor) => {
    return {type: 'ADD_CREDITOR', payload: creditor}
}

const updateCreditor = (id, creditor) => {
    return {type: 'UPDATE_CREDITOR', payload: {id, creditor}}
}

const removeCreditor = (id) => {
    return {type: 'REMOVE_CREDITOR', payload: id}
}

export const startGetCreditors = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/creditors`)
        .then(response => {
            const creditors = response.data
            dispatch(setCreditors(creditors))
        })
        .catch(err => {
            if (err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostCreditor = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/creditors`, formData)
            .then(response => {
                console.log(response)
                const creditor = response.data
                dispatch(addCreditor(creditor))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutCreditor = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/creditors/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const creditor = response.data
                const id = creditor._id
                dispatch(updateCreditor(id, creditor))
                history && history.push(`/businesses/${businessId}/creditors/${id}`)
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

export const startDeleteCreditor = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/creditors/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeCreditor(id))
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