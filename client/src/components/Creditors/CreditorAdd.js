import React from 'react'
import CreditorForm from '../Creditors/CreditorForm'
import {connect} from 'react-redux'
import {startPostCreditor} from '../../actions/creditors'

function CreditorAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostCreditor(props.businessId, formData))
        props.closeModal()
    }
    return (
        <div className="modalForm">
        <h3>Add A Product</h3>
        <CreditorForm businessId={props.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(CreditorAdd)