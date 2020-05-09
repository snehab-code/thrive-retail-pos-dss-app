import axios from '../config/axios'
import Swal from 'sweetalert2'

const setSales = (sales) => {
    return {type: 'SET_SALES', payload: sales}
}

const addSale = (sale) => {
    return {type: 'ADD_SALE', payload: sale}
}

const updateSale = (id, sale) => {
    return {type: 'UPDATE_SALE', payload: {id, sale}}
}

const removeSale = (id) => {
    return {type: 'REMOVE_SALE', payload: id}
}

export const startGetSales = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/sales`)
        .then(response => {
            const sales = response.data
            dispatch(setSales(sales))
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostSale = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/sales`, formData)
            .then(response => {
                const sale = response.data
                dispatch(addSale(sale))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutSale = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/sales/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const sale = response.data
                const id = sale._id
                dispatch(updateSale(id, sale))
                history && history.push(`/businesses/${businessId}/sales/${id}`)
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

export const startDeleteSale = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/sales/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeSale(id))
            })
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch({type: 'LOGOUT'})
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your sale',
                    footer: 'Please try again'
                  })
            })
    }
}