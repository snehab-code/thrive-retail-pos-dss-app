import axios from '../config/axios'
import Swal from 'sweetalert2'

const setCommodities = (commodities) => {
    return {type: 'SET_COMMODITIES', payload: commodities}
}

const addCommodity = (commodity) => {
    return {type: 'ADD_COMMODITY', payload: commodity}
}

const updateCommodity = (id, commodity) => {
    return {type: 'UPDATE_COMMODITY', payload: {id, commodity}}
}

const removeCommodity = (id) => {
    return {type: 'REMOVE_COMMODITY', payload: id}
}

export const startGetCommodities = (businessId) => {
    return (dispatch) => {
        axios.get(`/businesses/${businessId}/commodities`)
        .then(response => {
            const commodities = response.data
            dispatch(setCommodities(commodities))
        })
        .catch(err => {
            if (err.response.status == 401) {
                dispatch({type: 'LOGOUT'})
            }
        })
    }
}

export const startPostCommodity = (businessId, formData) => {
    return (dispatch) => {
        axios.post(`/businesses/${businessId}/commodities`, formData)
            .then(response => {
                console.log(response)
                const commodity = response.data
                dispatch(addCommodity(commodity))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}

export const startPutCommodity = (businessId, id, formData, history) => {
    return (dispatch) => {
        axios.put(`/businesses/${businessId}/commodities/${id}`, formData)
        .then(response=>{
            if (response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                })
            } else {
                const commodity = response.data
                const id = commodity._id
                dispatch(updateCommodity(id, commodity))
                history && history.push(`/businesses/${businessId}/commodities/${id}`)
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

export const startDeleteCommodity = (businessId, id) => {
    return (dispatch) => {
        axios.delete(`/businesses/${businessId}/commodities/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeCommodity(id))
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