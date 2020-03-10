import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert'

function BusinessList(props) {
    return (
        <>
            <Alert severity="info">You have a new join request</Alert>
            {
                props.businesses.map(business => {
                    return (
                        <Link key={business._id} to={`/businesses/${business._id}`} className="businessCardLink">
                        <div key={business._id} className="businessCard">   
                            <h2>{business.name}</h2>
                            {
                                business.permissions.includes('admin') ? <span>Admin</span> : <span>Team member</span> 
                            }
                        </div>
                        </Link>
                    )
                })
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        businesses: state.businesses
    }
}

export default connect(mapStateToProps)(BusinessList)