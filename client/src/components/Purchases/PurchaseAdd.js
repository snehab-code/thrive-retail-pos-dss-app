import React from 'react'
import PurchaseForm from './PurchaseForm'
import {connect} from 'react-redux'
import {startPostPurchase} from '../../actions/purchases'

function PurchaseAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostPurchase(props.match.params.businessId, formData))
    }

    return (
        <div className="businessForms">
        <h1> Add a purchase </h1>
        <PurchaseForm handleSubmit = {handleSubmit} />
        </div>
    )
}

export default connect()(PurchaseAdd)