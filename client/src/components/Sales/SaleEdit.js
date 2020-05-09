import React from 'react'
import SaleForm from './SaleForm'
import {startPutSale} from '../../actions/sales'
import {connect} from 'react-redux'

// if same product is added twice, increment quantity instead
function SaleEdit(props) {
    const handleSubmit = (formData) => {
        props.dispatch(startPutSale(props.match.params.businessId, props.sale._id, formData, props.history))
    }

    console.log('hi')
    return (
        <div className="businessForms">
        <h1>Sale Edit</h1>
        
        {props.sale && props.sale._id && <SaleForm businessId={props.match.params.businessId} {...props.sale} handleSubmit={handleSubmit}/>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        sale: state.sales.find(sale => sale._id === props.match.params.saleId)
    }
}

export default connect(mapStateToProps)(SaleEdit)