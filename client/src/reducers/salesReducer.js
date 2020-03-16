const salesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_SALES' : {
            return [...action.payload]
        }
        case 'ADD_SALE': {
            return [...state, action.payload]
        }
        case 'REMOVE_SALE': {
            return state.filter(sale => sale._id !== action.payload)
        }
        case 'UPDATE_SALE': {
            return state.map(sale => {
                if (sale._id === action.payload.id) {
                    return {...sale, ...action.payload.sale}
                } else {
                    return {...sale}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default salesReducer