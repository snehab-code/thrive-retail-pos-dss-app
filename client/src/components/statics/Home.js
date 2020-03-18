import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Footer from './Footer'

function Home(props) {
    return (
        <>
        {props.user.isLoaded && props.user.isLoggedIn && <Redirect to="/businesses" />}
        <div className="home">
            <div className="homeMessage">
            Simplify your business with Thrive.
            </div>
        </div>
        <Footer />
        </>
    )
}

const mapStateToProps = (state) => {
    return {user: state.user}
}
 
export default connect(mapStateToProps)(Home)