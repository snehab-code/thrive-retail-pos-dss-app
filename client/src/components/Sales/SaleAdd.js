import React from 'react'
import SaleForm from './SaleForm'
import {connect} from 'react-redux'
import {startPostSale} from '../../actions/sales'

function SaleAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostSale(props.match.params.businessId, formData))
    }

    return (
        <div className="businessForms">
        <h1> Generate an invoice </h1>
        <SaleForm businessId={props.match.params.businessId} handleSubmit = {handleSubmit} />
        </div>
    )
}

export default connect()(SaleAdd)