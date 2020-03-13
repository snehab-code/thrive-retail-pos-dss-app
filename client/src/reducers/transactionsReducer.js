const transactionsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_TRANSACTIONS' : {
            return [...action.payload]
        }
        case 'ADD_TRANSACTION': {
            return [...state, action.payload]
        }
        case 'REMOVE_TRANSACTION': {
            return state.filter(transaction => transaction._id !== action.payload)
        }
        case 'UPDATE_TRANSACTION': {
            return state.map(transaction => {
                if (transaction._id === action.payload.id) {
                    return {...transaction, ...action.payload.transaction}
                } else {
                    return {...transaction}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default transactionsReducer