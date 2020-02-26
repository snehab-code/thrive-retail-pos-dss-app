import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            <h1>THRIVE</h1>
            <div className="headerLinks">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Header