import axios from '../config/axios'
import {startGetBusinesses} from './businesses'

const loginUser = () => {
    return {
        type: 'LOGIN_USER'
    }
}

const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}

const failedLogin = (notice) => {
    return {
        type: 'LOGIN_FAILURE', payload: notice
    }
}

export const startCheckUserAuth = () => {
    return dispatch => {
        axios.get('/users/check-login')
            .then(response => {
                if (response.data.notice === 'valid user') {
                    dispatch(loginUser())
                    dispatch(startGetBusinesses())
                }
            })
            .catch(err => {
                console.log('check login', err)
                // history.push('/')
            })
    }
}

export const startPostUserLogin = (formData, history) => {
    return dispatch => {
        axios.post('/users/login', formData)
            .then(response => {
                if (response.data.notice) {
                    const notice = response.data.notice
                    dispatch(failedLogin(notice))
                } else {
                    const token = response.data
                    localStorage.setItem('authToken', token)
                    dispatch(loginUser())
                    history.push('/businesses')
                }
            })
            .catch(err => {
                console.log('Login error', err)
            })
    }
}

export const startPostUserLogout = (formData) => {
    return dispatch => {
        axios.delete('/users/logout', formData)
            .then(() => {
                localStorage.clear()
                dispatch(logoutUser())
                dispatch({type: 'LOGOUT'})
            })
            .catch(err => {
                console.log('Logout error', err)
            })
    }
}