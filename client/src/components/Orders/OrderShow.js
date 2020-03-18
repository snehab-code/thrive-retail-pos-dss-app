import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

function OrderShow(props) {
    console.log(props)

    return (
        <>
            <h3>Order details</h3>
            {props.order.supplier.name}
            <Link to={`/businesses/${props.order.business}/orders/${props.order._id}/edit`}>Edit Order</Link>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        order: state.orders.find(order => order._id === props.id)
    }
}

export default connect(mapStateToProps)(OrderShow)