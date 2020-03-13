const commoditiesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_COMMODITIES' : {
            return [...action.payload]
        }
        case 'ADD_COMMODITY': {
            return [...state, action.payload]
        }
        case 'REMOVE_COMMODITY': {
            return state.filter(commodity => commodity._id !== action.payload)
        }
        case 'UPDATE_COMMODITY': {
            return state.map(commodity => {
                if (commodity._id === action.payload.id) {
                    return {...commodity, ...action.payload.commodity}
                } else {
                    return {...commodity}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default commoditiesReducer

