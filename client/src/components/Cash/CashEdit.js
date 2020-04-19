import React from 'react'
import CashForm from './CashForm'
import {startPutCashBank} from '../../actions/cashBank'
import {connect} from 'react-redux'

function CashEdit(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPutCashBank(props.match.params.businessId, props.entry._id, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Edit Entry</h1>
        
        {props.entry && props.entry._id && <CashForm businessId={props.match.params.businessId} {...props.entry} handleSubmit={handleSubmit}/>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        entry: state.cashBank.find(entry => entry._id === props.match.params.cashbookId)
    }
}

export default connect(mapStateToProps)(CashEdit)