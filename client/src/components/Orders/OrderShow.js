import React from 'react'
import {connect} from 'react-redux'

function OrderShow(props) {
    return (
        <>
            <h3>Order details</h3>
            {props.order}
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        order: state.orders.find(order => order._id === props.id)
    }
}

export default connect(mapStateToProps)(OrderShow)