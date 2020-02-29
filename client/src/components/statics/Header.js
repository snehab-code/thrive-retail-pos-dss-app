import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {startPostUserLogout} from '../../actions/user'

function Header(props) {
    return (
        <div className="header">
            <Link to="/"><h1>THRIVE</h1></Link>
            <div className="headerLinks">
                {
                    props.user.isLoggedIn ? 
                    <div className="headerLinks">
                    <Link to ="/" onClick={() => {props.dispatch(startPostUserLogout())}}>Logout</Link>
                    </div>
                    :
                    <div className="headerLinks">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header)