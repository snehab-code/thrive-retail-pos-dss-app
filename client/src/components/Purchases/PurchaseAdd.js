import React from 'react'
import PurchaseForm from './PurchaseForm'
import {connect} from 'react-redux'
import {startPostPurchase} from '../../actions/purchases'

function PurchaseAdd(props) {

    const handleSubmit = (formData) => {
        props.match ? (
            props.dispatch(startPostPurchase(props.match.params.businessId, formData, props.history))
        )
        : 
        props.dispatch(startPostPurchase(props.id, formData, props.history))
        props.closeModal()
    }

    return (
        <div className="businessForms" style={props.orderData && {width:'100%'}}>
        <h1> Add a purchase </h1>
        <PurchaseForm handleSubmit = {handleSubmit} {...props.orderData}/>
        </div>
    )
}

export default connect()(PurchaseAdd)