const clientsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_CLIENTS' : {
            return [...action.payload]
        }
        case 'ADD_CLIENT': {
            return [...state, action.payload]
        }
        case 'REMOVE_CLIENT': {
            return state.filter(client => client._id !== action.payload)
        }
        case 'UPDATE_CLIENT': {
            return state.map(client => {
                if (client._id === action.payload.id) {
                    return {...client, ...action.payload.client}
                } else {
                    return {...client}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default clientsReducer