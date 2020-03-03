import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function BusinessList(props) {
    console.log(props)
    return (
        <>
            {
                props.businesses.map(business => {
                    return (
                        <Link to={`/businesses/${business._id}`} className="businessCardLink">
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