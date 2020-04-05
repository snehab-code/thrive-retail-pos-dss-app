import React from 'react'
import PayableForm from './PayableForm'
import {connect} from 'react-redux'
import {startPostPayable} from '../../actions/payables'

function PayableAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostPayable(props.match.params.businessId, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Add an Expense</h1>
        
        <PayableForm businessId={props.match.params.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(PayableAdd)