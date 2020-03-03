import React from 'react'
import BusinessList from './BusinessList'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

function BusinessLanding(props) {
    return (
        <>     
        <BusinessList/>
        <Fab color="primary" aria-label="add" size="large">
            <AddIcon/>
        </Fab>
        </>
    )
}

export default BusinessLanding