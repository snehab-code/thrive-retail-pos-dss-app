const creditorsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_CREDITORS' : {
            return [...action.payload]
        }
        case 'ADD_CREDITOR': {
            return [...state, action.payload]
        }
        case 'REMOVE_CREDITOR': {
            return state.filter(creditor => creditor._id !== action.payload)
        }
        case 'UPDATE_CREDITOR': {
            return state.map(creditor => {
                if (creditor._id === action.payload.id) {
                    return {...creditor, ...action.payload.creditor}
                } else {
                    return {...creditor}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default creditorsReducer