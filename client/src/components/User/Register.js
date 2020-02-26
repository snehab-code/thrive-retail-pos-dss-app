import React from 'react'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Register extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('handle submit')
    }

    render(){
        return (
            <>
              <div className="loginPanel">
                  
                <form onSubmit={this.handleSubmit}>
                  <h3>Register</h3>
                  <TextField size="small" label="username"/>
                  <TextField size="small" label="email"/>
                  <TextField size="small" type="password" label="password"/>
                  <Button 
                    size="small" 
                    type="submit" 
                  >
                    Sign up
                  </Button>
                </form>
                  <div>
                    <Link to="/forgot-password">Forgot Password</Link>
                  </div>
              </div>
              
            </>
        )
    }
}

export default Register