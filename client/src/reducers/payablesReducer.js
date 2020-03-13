const payablesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_PAYABLES' : {
            return [...action.payload]
        }
        case 'ADD_PAYABLE': {
            return [...state, action.payload]
        }
        case 'REMOVE_PAYABLE': {
            return state.filter(payable => payable._id !== action.payload)
        }
        case 'UPDATE_PAYABLE': {
            return state.map(payable => {
                if (payable._id === action.payload.id) {
                    return {...payable, ...action.payload.payable}
                } else {
                    return {...payable}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default payablesReducer