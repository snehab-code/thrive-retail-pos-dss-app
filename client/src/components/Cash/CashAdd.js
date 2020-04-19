import React from 'react'
import CashForm from './CashForm'
import {connect} from 'react-redux'
import {startPostCashBank} from '../../actions/cashBank'

function CashAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostCashBank(props.match.params.businessId, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Add a transaction</h1>
        
        <CashForm businessId={props.match.params.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(CashAdd)