import React from 'react'
import {connect} from 'react-redux'

function SaleShow(props) {
    return (
        <>
            <h3>Sale details</h3>
            {props.sale.commodity.name}
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        sale: state.transactions.find(sale => sale._id === props.id)
    }
}

export default connect(mapStateToProps)(SaleShow)