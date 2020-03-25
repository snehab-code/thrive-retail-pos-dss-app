import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

function SaleShow(props) {
    return (
        <>
            <h3>Sale details</h3>
            {props.sale.client.name}
            <Link to={`/businesses/${props.sale.business}/invoices/${props.sale._id}/edit`}><Button>Edit Invoice</Button></Link>
            <Button onClick={() => props.handleRemove(props.sale._id)}>Remove Sale</Button>
            // add cancel sale - preserves invoicenumber but marks transaction as cancelled
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        sale: state.sales.find(sale => sale._id === props.id)
    }
}

export default connect(mapStateToProps)(SaleShow)