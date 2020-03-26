import axios from '../config/axios'
import Swal from 'sweetalert2'

const setSuppliers = (suppliers) => {
    return {type: 'SET_SUPPLIERS', payload: suppliers}
}

const addSupplier = (supplier) => {
    return {type: 'ADD_SUPPLIER', payload: supplier}
}

const updateSupplier = (id, supplier) => {
    return {type: 'UPDATE_SUPPLIER', payload: {id, supplier}}
}

const removeSupplier = (id) => {
    return {type: 'REMOVE_SUPPLIER', payload: id}
}

export const startGetSuppliers = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/suppliers`)
        .then(response => {
            const suppliers = response.data
            dispatch(setSuppliers(suppliers))
        })
        .catch(err => {
            if (err.response.status === 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostSupplier = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/suppliers`, formData)
            .then(response => {
                console.log(response)
                const supplier = response.data
                dispatch(addSupplier(supplier))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutSupplier = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/suppliers/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const supplier = response.data
                const id = supplier._id
                dispatch(updateSupplier(id, supplier))
                history && history.push(`/businesses/${businessId}/suppliers/${id}`)
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

export const startDeleteSupplier = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/suppliers/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeSupplier(id))
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