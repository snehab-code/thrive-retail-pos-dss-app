import React from 'react'
import {Link} from 'react-router-dom'
import BusinessList from './BusinessList'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

function BusinessLanding(props) {
    return (
        <>     
        <BusinessList/>
        <Link to="/businesses/new">
        <Fab color="primary" aria-label="add" size="large">
            <AddIcon/>
        </Fab>
        </Link>
        </>
    )
}

export default BusinessLanding