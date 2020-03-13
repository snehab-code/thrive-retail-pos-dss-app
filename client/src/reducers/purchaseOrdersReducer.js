const purchaseOrdersReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_PURCHASEORDERS' : {
            return [...action.payload]
        }
        case 'ADD_PURCHASEORDER': {
            return [...state, action.payload]
        }
        case 'REMOVE_PURCHASEORDER': {
            return state.filter(purchaseOrder => purchaseOrder._id !== action.payload)
        }
        case 'UPDATE_PURCHASEORDER': {
            return state.map(purchaseOrder => {
                if (purchaseOrder._id === action.payload.id) {
                    return {...purchaseOrder, ...action.payload.purchaseOrder}
                } else {
                    return {...purchaseOrder}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default purchaseOrdersReducer