import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

function ClientShow(props) {
    return (
        <>
            <h3>Client details</h3>
            <Link to={`/businesses/${props.client.business}/clients/${props.client._id}/edit`}><Button>Edit Client</Button></Link>
            <Button onClick={() => props.handleRemove(props.client._id)}>Remove Client</Button>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        client: state.clients.find(client => client._id === props.id)
    }
}

export default connect(mapStateToProps)(ClientShow)