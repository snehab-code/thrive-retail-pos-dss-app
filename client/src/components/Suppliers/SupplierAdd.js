import React from 'react'
import SupplierForm from '../Suppliers/SupplierForm'
import {connect} from 'react-redux'
import {startPostSupplier} from '../../actions/suppliers'

function SupplierAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostSupplier(props.businessId, formData))
        props.closeModal()
    }
    return (
        <div className="modalForm">
        <h3>Add A Supplier</h3>
        <SupplierForm businessId={props.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(SupplierAdd)