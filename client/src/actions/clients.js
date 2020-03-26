import axios from '../config/axios'
import Swal from 'sweetalert2'

const setClients = (clients) => {
    return {type: 'SET_CLIENTS', payload: clients}
}

const addClient = (client) => {
    return {type: 'ADD_CLIENT', payload: client}
}

const updateClient = (id, client) => {
    return {type: 'UPDATE_CLIENT', payload: {id, client}}
}

const removeClient = (id) => {
    return {type: 'REMOVE_CLIENT', payload: id}
}

export const startGetClients = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/clients`)
        .then(response => {
            const clients = response.data
            dispatch(setClients(clients))
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostClient = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/clients`, formData)
            .then(response => {
                console.log(response)
                const client = response.data
                dispatch(addClient(client))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutClient = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/clients/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const client = response.data
                const id = client._id
                dispatch(updateClient(id, client))
                history && history.push(`/businesses/${businessId}/clients/${id}`)
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

export const startDeleteClient = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/clients/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeClient(id))
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