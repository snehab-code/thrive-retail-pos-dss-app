const CasnBankReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_CASHBANK' : {
            return [...action.payload]
        }
        case 'ADD_CASHBANK': {
            return [...state, action.payload]
        }
        case 'REMOVE_CASHBANK': {
            return state.filter(cashBank => cashBank._id !== action.payload)
        }
        case 'UPDATE_CASHBANK': {
            return state.map(cashBank => {
                if (cashBank._id === action.payload.id) {
                    return {...cashBank, ...action.payload.cashBank}
                } else {
                    return {...cashBank}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default CasnBankReducer

