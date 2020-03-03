import React from 'react'
import {connect} from 'react-redux'
import Drawer from '@material-ui/core/Drawer'

class BusinessHome extends React.Component {
    constructor() {
        super()
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        return(
        <>
        {this.state.drawerOpen &&
        <Drawer 
            className="businessDrawer"
            variant="permanent"
        >
            hi
        </Drawer>
        }
            <h2>{this.props.business && this.props.business.name}</h2>
        </>
        
    )
    }
}

const mapStateToProps = (state, props) => {
    return {
        business: state.businesses.find(business => business._id == props.match.params.businessId)
    }
}

export default connect(mapStateToProps)(BusinessHome)