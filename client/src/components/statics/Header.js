import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {startPostUserLogout} from '../../actions/user'
import MenuIcon from '@material-ui/icons/Menu'

function Header(props) {
    return (
        <div className="header">
            {props.location.pathname.includes('/businesses/') ?
             <div className="logo">
                <MenuIcon/>
                <Link to="/businesses"><h1>THRIVE</h1></Link>
             </div>
             :
             <div className="logo">
                <Link to="/"><h1>THRIVE</h1></Link>
            </div>
            }
            
            <div className="headerLinks">
                {
                    props.user.isLoggedIn ? 
                    <div className="headerLinks">
                    <Link to ="/businesses">Businesses</Link>
                    <Link to ="/user">Settings</Link>
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

export default withRouter(connect(mapStateToProps)(Header))