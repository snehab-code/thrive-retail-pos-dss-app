import React from 'react'
import PaymentForm from './PaymentForm'
import {startPutCashBank} from '../../actions/cashBank'
import {connect} from 'react-redux'

function PaymentEdit(props) {
    const handleSubmit = (formData) => {
        props.dispatch(startPutCashBank(props.match.params.businessId, props.payable._id, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Edit Expense</h1>
        
        {props.payable && props.payable._id && <PaymentForm businessId={props.match.params.businessId} {...props.payable} handleSubmit={handleSubmit}/>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        payable: state.cashBank.find(payable => payable._id === props.match.params.expenseId)
    }
}

export default connect(mapStateToProps)(PaymentEdit)