import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function OrderShow(props) {

    return (
        <>
            <h3 style={{marginBottom: 0}}>Order - {props.order.orderNumber}</h3>
            {props.order.supplier.name}

            {
                props.order.commodities.map(commodity => {
                    const product = props.products.find(prod => prod._id === commodity.product._id)
                    return (
                    <div key={commodity._id}>
                        {commodity.product.name} - {commodity.rate} x {commodity.quantity}{product.unit}
                    </div>
                    )
                })
            }

            <div style={{display:'flex'}}>
            <Link to={`/businesses/${props.order.business}/orders/${props.order._id}/edit`}>
                <Button className="showButton"><EditIcon /></Button>
            </Link>
            <Button className="showButton" onClick={() => props.handleRemove(props.order._id)}><DeleteIcon /></Button>
            </div>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        order: state.orders.find(order => order._id === props.id),
        products: state.commodities
    }
}

export default connect(mapStateToProps)(OrderShow)