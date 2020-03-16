const ordersReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_ORDERS' : {
            return [...action.payload]
        }
        case 'ADD_ORDER': {
            return [...state, action.payload]
        }
        case 'REMOVE_ORDER': {
            return state.filter(order => order._id !== action.payload)
        }
        case 'UPDATE_ORDER': {
            return state.map(order => {
                if (order._id === action.payload.id) {
                    return {...order, ...action.payload.order}
                } else {
                    return {...order}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default ordersReducer