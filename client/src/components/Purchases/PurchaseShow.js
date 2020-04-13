import React from 'react'
import {connect} from 'react-redux'

function PurchaseShow(props) {
    return (
        <>
            <h3>Purchase details</h3>
            {props.purchase.commodity.name}
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        purchase: state.purchases.find(purchase => purchase._id === props.id)
    }
}

export default connect(mapStateToProps)(PurchaseShow)