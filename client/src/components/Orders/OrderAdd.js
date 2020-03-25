import React from 'react'
import OrderForm from './OrderForm'
import {connect} from 'react-redux'
import {startPostOrder} from '../../actions/orders'

function OrderAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostOrder(props.match.params.businessId, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Order Add</h1>
        
        <OrderForm businessId={props.match.params.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(OrderAdd)