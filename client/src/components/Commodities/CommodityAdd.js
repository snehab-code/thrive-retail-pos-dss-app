import React from 'react'
import CommodityForm from '../Commodities/CommodityForm'
import {connect} from 'react-redux'
import {startPostCommodity} from '../../actions/commodities'

function CommodityAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostCommodity(props.businessId, formData))
        props.closeModal()
    }
    return (
        <div className="modalForm">
        <h3>Add A Product</h3>
        <CommodityForm businessId={props.businessId} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(CommodityAdd)