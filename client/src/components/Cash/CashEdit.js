import React from 'react'
import CashForm from './CashForm'
import {startPutCashBank} from '../../actions/cashBank'
import {connect} from 'react-redux'

function CashEdit(props) {
    const handleSubmit = (formData) => {
        props.dispatch(startPutCashBank(props.match.params.businessId, props.payable._id, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Edit Expense</h1>
        
        {props.payable && props.payable._id && <CashForm businessId={props.match.params.businessId} {...props.payable} handleSubmit={handleSubmit}/>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        payable: state.cashBank.find(payable => payable._id === props.match.params.expenseId)
    }
}

export default connect(mapStateToProps)(CashEdit)