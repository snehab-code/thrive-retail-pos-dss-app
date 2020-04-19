import React from 'react'
import PaymentForm from './PaymentForm'
import {connect} from 'react-redux'
import {startPostCashBank} from '../../actions/cashBank'

function PaymentAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostCashBank(props.match.params.businessId, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Add a Payment</h1>
        
        <PaymentForm businessId={props.match.params.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(PaymentAdd)