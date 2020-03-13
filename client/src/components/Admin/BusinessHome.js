import React from 'react'
import {connect} from 'react-redux'

function BusinessHome(props){
    return(
    <>
        <h2>{props.business && props.business.name}</h2>
    </>
    
    )
}

const mapStateToProps = (state, props) => {
    return {
        business: state.businesses.find(business => business._id == props.match.params.businessId)
    }
}

export default connect(mapStateToProps)(BusinessHome)