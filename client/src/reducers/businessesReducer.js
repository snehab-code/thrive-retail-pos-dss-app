const businessesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_BUSINESSES' : {
            return [...action.payload]
        }
        case 'ADD_BUSINESS': {
            return [...state, action.payload]
        }
        case 'REMOVE_BUSINESS': {
            return state.filter(business => business._id !== action.payload)
        }
        case 'UPDATE_BUSINESS': {
            return state.map(business => {
                if (business._id === action.payload.id) {
                    return {...business, ...action.payload.business}
                } else {
                    return {...business}
                }
            })
        }
        default: {
            return state
        }
    }
}

// selector function
// export const businessSelector = (state, selector) => {
//     switch(selector.type) {
//         case 'RESOLVED': {
//             return state.filter(business=> business.isResolved)
//         }
//     }
// }

export default businessesReducer

