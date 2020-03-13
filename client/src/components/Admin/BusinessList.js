import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startPostJoin} from '../../actions/businesses'
import {setActiveBusiness} from '../../actions/user'
import Button from '@material-ui/core/Button'

function BusinessList(props) {

    const handleJoin = (id) => {
        const formData = {
            accepted: true
        }
        props.dispatch(startPostJoin(id, formData))
    }

    const handleClick = (id) => {
        props.dispatch(setActiveBusiness(id))
    }

    return (
        <>
            {props.user.isLoggedIn && props.user.invitedTo[0] && (
                props.user.invitedTo.map(business => {
                    return (
                        <div key={business._id} className="businessInvite">
                            <div className="businessCard">   
                            <div>
                                <h3>{business.name}</h3>
                                has invited you to join its team
                                <br/>
                                <span>
                                Address: {business.address}
                                <br/>
                                Phone: {business.phone}
                                </span>
                            </div>
                            <div>
                                <Button onClick={() => handleJoin(business._id)}> Accept </Button>
                                <Button> Decline </Button>
                            </div>
                            </div>
                        </div>
                    )
                })
            )}
            {
                props.businesses.map(business => {
                    return (
                        <Link key={business._id} to={`/businesses/${business._id}`} onClick = {() => handleClick(business._id)}className="businessCardLink">
                        <div className="businessCard">
                                <h2>{business.name}</h2>
                                <span>
                                Address: {business.address}
                                <br/>
                                Phone: {business.phone}
                                </span>
                            {
                                business.permissions && business.permissions.includes('admin') ? <span>Admin</span> : <span>Team member</span> 
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
        businesses: state.businesses,
        user: state.user
    }
}

export default connect(mapStateToProps)(BusinessList)