import React from 'react'
import {connect} from 'react-redux'

function PayableShow(props) {
    return (
        <>
            <h3>Payable details</h3>
            {props.payable.remark}
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        payable: state.payables.find(payable => payable._id === props.id)
    }
}

export default connect(mapStateToProps)(PayableShow)