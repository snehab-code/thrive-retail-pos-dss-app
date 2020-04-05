import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startPostJoin} from '../../actions/businesses'
import {startGetBusinessInfo} from '../../actions/businesses'
import Button from '@material-ui/core/Button'

function BusinessList(props) {

    const handleJoin = (id) => {
        const formData = {
            accepted: true
        }
        props.dispatch(startPostJoin(id, formData))
    }

    const handleClick = (id) => {
        props.dispatch(startGetBusinessInfo(id))
    }

    return (
        <div className="businessContentContainer">
        <div className="businessContent">
        <h1>Businesses</h1>
        <div className="cardGrid">
            {props.user.isLoggedIn && props.user.invitedTo[0] && (
                props.user.invitedTo.map(business => {
                    return (
                        <div key={business._id} className="businessInvite">
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
                    )
                })
            )}
            {
                props.businesses.map(business => {
                    return (
                        <Link key={business._id} to={`/businesses/${business._id}`} onClick = {() => handleClick(business._id)}className="businessCardLink">
                        <div className="businessCard">
                            <div className="businessLogo">
                            x
                            </div>
                            <div className="businessInfo">
                                <h2>{business.name}</h2>
                                <span>
                                Address: {business.address}
                                <br/>
                                Phone: {business.phone}
                                <br/>
                                </span>
                            {
                                business.permissions && business.permissions.includes('admin') ? <span>Admin</span> : <span>Team member</span> 
                            }
                            </div>
                        </div>
                        </Link>
                    )
                })
            }
            
        </div>
        ...
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        businesses: state.businesses,
        user: state.user
    }
}

export default connect(mapStateToProps)(BusinessList)