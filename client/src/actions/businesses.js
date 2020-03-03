import axios from '../config/axios'

const setBusinesses = (businesses) => {
    return {type: 'SET_BUSINESSES', payload: businesses}
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