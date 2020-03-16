import axios from '../config/axios'
import Swal from 'sweetalert2'

const setPurchases = (purchases) => {
    return {type: 'SET_PURCHASES', payload: purchases}
}

const addPurchase = (purchase) => {
    return {type: 'ADD_PURCHASE', payload: purchase}
}

const updatePurchase = (id, purchase) => {
    return {type: 'UPDATE_PURCHASE', payload: {id, purchase}}
}

const removePurchase = (id) => {
    return {type: 'REMOVE_PURCHASE', payload: id}
}

export const startGetPurchases = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/purchases`)
        .then(response => {
            const purchases = response.data
            dispatch(setPurchases(purchases))
        })
        .catch(err => {
            if (err.response && err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostPurchase = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/purchases`, formData)
            .then(response => {
                console.log(response)
                const purchase = response.data
                dispatch(addPurchase(purchase))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutPurchase = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/purchases/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const purchase = response.data
                const id = purchase._id
                dispatch(updatePurchase(id, purchase))
                history && history.push(`/businesses/${businessId}/purchases/${id}`)
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

export const startDeletePurchase = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/purchases/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removePurchase(id))
            })
            .catch(err => {
                if (err.response.status == 401) {
                    dispatch({type: 'LOGOUT'})
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your purchase',
                    footer: 'Please try again'
                  })
            })
    }
}