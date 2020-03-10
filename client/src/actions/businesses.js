import axios from '../config/axios'
import Swal from 'sweetalert2'

const setBusinesses = (businesses) => {
    return {type: 'SET_BUSINESSES', payload: businesses}
}

const addBusiness = (business) => {
    return {type: 'ADD_BUSINESS', payload: business}
}

export const startGetBusinesses = () => {
    return (dispatch) => {
        axios.get(`/businesses`)
            .then(response => {
                const businesses = response.data
                dispatch(setBusinesses(businesses))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startPostBusiness = (formData) => {
    return (dispatch) => {
        axios.post('/businesses', formData)
            .then(response => {
                console.log(response)
                const business = response.data
                dispatch(addBusiness(business))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err
                })
            })
    }
}