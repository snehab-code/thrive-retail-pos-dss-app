import React from 'react'
import {connect} from 'react-redux'
import SaleForm from './SaleForm'

function SaleAdd(props) {

    const handleSubmit = () => {
        console.log('hi')
    }

    return (
        <>
        <h1> Generate an invoice </h1>
        {/* This adds to transaction BUT add clients, add commodities (they might be creating them!) */}
        <SaleForm handleSubmit = {handleSubmit} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients,
        commodities: state.commodities
    }
}

export default connect()(SaleAdd)