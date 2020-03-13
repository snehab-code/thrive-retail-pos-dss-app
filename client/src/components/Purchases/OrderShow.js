import React from 'react'
import {connect} from 'react-redux'

function OrderShow(props) {
    return (
        <>
            <h3>Order details</h3>
            {props.order.commodity.name}
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        order: state.purchaseOrders.find(order => order._id === props.id)
    }
}

export default connect(mapStateToProps)(OrderShow)