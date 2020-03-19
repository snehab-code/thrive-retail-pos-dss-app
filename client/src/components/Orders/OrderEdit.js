import React from 'react'
import OrderForm from './OrderForm'
import {startPutOrder} from '../../actions/orders'
import {connect} from 'react-redux'

function OrderEdit(props) {
    const handleSubmit = (formData) => {
        props.dispatch(startPutOrder(props.match.params.businessId, props.order._id, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Order Edit</h1>
        
        {props.order && props.order._id && <OrderForm businessId={props.match.params.businessId} {...props.order} handleSubmit={handleSubmit}/>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        order: state.orders.find(order => order._id === props.match.params.orderId)
    }
}

export default connect(mapStateToProps)(OrderEdit)