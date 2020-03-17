import React from 'react'
import {connect} from 'react-redux'
import OrderForm from './OrderForm'


function OrderAdd(props) {
    return (
        <div className="businessForms">
        <h1>Order Add</h1>
        
        <OrderForm businessId={props.match.params.businessId}/>
        </div>
    )
}

export default OrderAdd