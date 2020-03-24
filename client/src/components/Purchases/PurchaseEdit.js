import React from 'react'
import PurchaseForm from './PurchaseForm'
import {startPutPurchase} from '../../actions/purchases'
import {connect} from 'react-redux'

function PurchaseEdit(props) {
    const handleSubmit = (formData) => {
        props.dispatch(startPutPurchase(props.match.params.businessId, props.purchase._id, formData, props.history))
    }

    return (
        <div className="businessForms">
        <h1>Purchase Edit</h1>
        
        {props.purchase && props.purchase._id && <PurchaseForm businessId={props.match.params.businessId} {...props.purchase} handleSubmit={handleSubmit}/>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        purchase: state.purchases.find(purchase => purchase._id === props.match.params.purchaseId)
    }
}

export default connect(mapStateToProps)(PurchaseEdit)