const userReducer = (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN_USER': {
            return {isLoggedIn: true,...action.payload}
        }
        case 'LOGOUT_USER': {
            return {isLoggedIn: false}
        }
        case 'LOGIN_FAILURE': {
            return {isLoggedIn: false, notice: action.payload}
        }
        default: {
            return state
        }
    }
}

export default userReducer