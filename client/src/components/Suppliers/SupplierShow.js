import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

function SupplierShow(props) {
    return (
        <>
            <h3>Supplier details</h3>
            <Link to={`/businesses/${props.supplier.business}/suppliers/${props.supplier._id}/edit`}><Button>Edit Supplier</Button></Link>
            <Button onClick={() => props.handleRemove(props.supplier._id)}>Remove Supplier</Button>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        supplier: state.suppliers.find(supplier => supplier._id === props.id)
    }
}

export default connect(mapStateToProps)(SupplierShow)