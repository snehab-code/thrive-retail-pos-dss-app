const suppliersReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_SUPPLIERS' : {
            return [...action.payload]
        }
        case 'ADD_SUPPLIER': {
            return [...state, action.payload]
        }
        case 'REMOVE_SUPPLIER': {
            return state.filter(supplier => supplier._id !== action.payload)
        }
        case 'UPDATE_SUPPLIER': {
            return state.map(supplier => {
                if (supplier._id === action.payload.id) {
                    return {...supplier, ...action.payload.supplier}
                } else {
                    return {...supplier}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default suppliersReducer