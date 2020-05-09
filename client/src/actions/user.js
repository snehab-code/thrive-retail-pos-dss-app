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

export const setActiveBusiness = (business) => {
    return {
        type: 'ACTIVE_BUSINESS', payload: business
    }
}

export const startCheckUserAuth = () => {
    return (dispatch, getState) => {
        axios.get('/users/relogin')
            .then(response => {
                if (response.data.username) {
                    const user = {
                        username: response.data.username,
                        invitedTo: response.data.invitedTo
                    }
                    dispatch(loginUser(user))
                    dispatch(startGetBusinesses())
                    const businessId = getState().user.activeBusiness._id
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

export const startPostUserRegistration = (formData, history) => {
    return dispatch => {
        axios.post('/users/register', formData)
        .then(response => {
            history.push('/login')
        })
        .catch(err => {
            console.log(err)
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

export const startUserLogout = (history) => {
    return dispatch => {
        axios.delete('/users/logout')
            .then(() => {
                dispatch(logoutUser())
                dispatch({type: 'LOGOUT'})
                localStorage.clear()
                history.push('/')
            })
            .catch(err => {
                console.log('Logout error', err)
            })
    }
}