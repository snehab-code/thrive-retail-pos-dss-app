import axios from '../config/axios'
import {startGetBusinesses} from './businesses'
import {startGetBusinessInfo} from './businesses'

const loginUser = (user) => {
    return {
        type: 'LOGIN_USER', payload: user
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

export const setActiveBusiness = (id) => {
    return {
        type: 'ACTIVE_BUSINESS', payload: id
    }
}

export const startCheckUserAuth = () => {
    return (dispatch, getState) => {
        axios.get('/users/relogin')
            .then(response => {
                console.log(response)
                if (response.data.username) {
                    const user = {
                        username: response.data.username,
                        invitedTo: response.data.invitedTo
                    }
                    dispatch(loginUser(user))
                    dispatch(startGetBusinesses())
                    const businessId = getState().user.activeBusiness
                    if (businessId) {
                        dispatch(startGetBusinessInfo(businessId))
                    }
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
                    console.log(response)
                    const token = response.data.token
                    const user = {
                        username: response.data.userName,
                        invitedTo: response.data.invitedTo
                    }
                    localStorage.setItem('authToken', token)
                    dispatch(loginUser(user))
                    dispatch(startGetBusinesses())
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