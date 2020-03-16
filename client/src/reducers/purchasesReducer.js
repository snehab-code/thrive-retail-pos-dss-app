const purchasesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_PURCHASES' : {
            return [...action.payload]
        }
        case 'ADD_PURCHASE': {
            return [...state, action.payload]
        }
        case 'REMOVE_PURCHASE': {
            return state.filter(purchase => purchase._id !== action.payload)
        }
        case 'UPDATE_PURCHASE': {
            return state.map(purchase => {
                if (purchase._id === action.payload.id) {
                    return {...purchase, ...action.payload.purchase}
                } else {
                    return {...purchase}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default purchasesReducer