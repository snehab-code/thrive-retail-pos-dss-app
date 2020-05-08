import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

function CommodityShow(props) {
    return (
        <>
            <h3>Commodity details</h3>
            <Link to={`/businesses/${props.commodity.business}/commodities/${props.commodity._id}/edit`}><Button>Edit Commodity</Button></Link>
            <Button onClick={() => props.handleRemove(props.commodity._id)}>Remove Commodity</Button>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        commodity: state.commodities.find(commodity => commodity._id === props.id)
    }
}

export default connect(mapStateToProps)(CommodityShow)