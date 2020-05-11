import React from 'react'
import ClientForm from '../Clients/ClientForm'
import {connect} from 'react-redux'
import {startPostClient} from '../../actions/clients'

function ClientAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostClient(props.businessId, formData))
        props.closeModal()
    }
    return (
        <div className="modalForm">
        <h3>Add A Client</h3>
        <ClientForm businessId={props.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(ClientAdd)