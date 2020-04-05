import React from 'react'
import PayableForm from './PayableForm'
import {startPutPayable} from '../../actions/payables'
import {connect} from 'react-redux'

function PayableEdit(props) {
    const handleSubmit = (formData) => {
        props.dispatch(startPutPayable(props.match.params.businessId, props.payable._id, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Edit Expense</h1>
        
        {props.payable && props.payable._id && <PayableForm businessId={props.match.params.businessId} {...props.payable} handleSubmit={handleSubmit}/>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        payable: state.payables.find(payable => payable._id === props.match.params.expenseId)
    }
}

export default connect(mapStateToProps)(PayableEdit)