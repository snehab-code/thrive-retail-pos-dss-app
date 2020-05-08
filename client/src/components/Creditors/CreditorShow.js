import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

function CreditorShow(props) {
    return (
        <>
            <h3>Creditor details</h3>
            <Link to={`/businesses/${props.creditor.business}/creditors/${props.creditor._id}/edit`}><Button>Edit Creditor</Button></Link>
            <Button onClick={() => props.handleRemove(props.creditor._id)}>Remove Creditor</Button>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        creditor: state.creditors.find(creditor => creditor._id === props.id)
    }
}

export default connect(mapStateToProps)(CreditorShow)